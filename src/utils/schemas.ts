
import { z } from "zod";

export const User = z
  .object({
    email: z.string({
      invalid_type_error: "Invalid email",
      required_error: "Email is required",
    }),
    username: z.string({
      required_error: "Username is required",
      invalid_type_error: "Invalid username",
    }),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Invalid password",
      })
      .refine((password) => password.length >= 8, {
        message: "Password should be at least 8 characters",
      })
      .refine((password) => password.length <= 20, {
        message: "Password should be at most 20 characters",
      }),
    teamId: z
      .number({
        required_error: "Team is required",
        invalid_type_error: "Invalid team",
        message: "Team should be a number",
      })
      .refine(
        async (teamId) => {
          try {
            const response = await fetch(
              `https://fantasy.premierleague.com/api/entry/${teamId}/`
            );

            const data = await response.json();

            return data.id === teamId;
          } catch (e) {
            return false;
          }
        },
        {
          message: "Team ID does not exist",
        }
      ),
    confirmPassword: z.string({
      required_error: "Confirm password is required",
      invalid_type_error: "Invalid confirm password",
      message: "Confirm password should be a string",
    }),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords do not match",
    }
  );

export const signUser = z.object({
  email: z.string({
    invalid_type_error: "Invalid email",
    required_error: "Email is required",
  }),
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Invalid password",
  }),
});
