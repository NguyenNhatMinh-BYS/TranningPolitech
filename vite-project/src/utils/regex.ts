export const regex = {
    password:/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    phone_number:/^[0-9\-\+]{9,15}$/
}