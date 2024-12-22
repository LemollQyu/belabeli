import axios from "axios";

type PasswordNew = {
  otps_id: string;
  users_id: string;
  new_password: string;
  new_password_confirmation: string;
};

export default async function passNew({
  otps_id,
  users_id,
  new_password,
  new_password_confirmation,
}: PasswordNew) {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/password`,
    {
      otps_id: otps_id,
      users_id: users_id,
      new_password: new_password,
      new_password_confirmation: new_password_confirmation,
    }
  );

  return response;
}
