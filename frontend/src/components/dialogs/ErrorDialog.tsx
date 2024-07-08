export type ErrorType = "NETWORK_ERROR" |
                        "INVALID_CREDENTIALS" |
                        "REGISTER_EMAIL_USED" |
                        "REGISTER_USERNAME_USED" |
                        "REGISTER_INVALID_USERNAME" |
                        "REGISTER_INVALID_EMAIL" |
                        "REGISTER_PASSWORD_MATCH" |
                        "EMPTY_USERNAME" |
                        "EMPTY_EMAIL" |
                        "EMPTY_PASSWORD" |
                        "UNKNOWN_ERROR" |
                        "NONE";

export function ErrorDialog({ errorType }: { errorType: ErrorType }) {
    function getErrorMessage(error: ErrorType): string {
        switch (error) {
            case "NETWORK_ERROR":
                return "A network error occurred. Please try again."

            case "INVALID_CREDENTIALS":
                return "Invalid username or password. Please try again."

            case "REGISTER_PASSWORD_MATCH":
                return "Passwords do not match. Please try again."

            case "REGISTER_EMAIL_USED":
                return "E-Mail is already in use. Please try a different E-Mail."

            case "REGISTER_USERNAME_USED":
                return "Username is already in use. Please try a different name."

            case "REGISTER_INVALID_USERNAME":
                return "Invalid username. Please try a different name."

            case "REGISTER_INVALID_EMAIL":
                return "Invalid email. Please try a different email."

            case "EMPTY_USERNAME":
                return "Please choose a valid username."

            case "EMPTY_EMAIL":
                return "Please enter a valid email address."

            case "EMPTY_PASSWORD":
                return "Please enter a valid password."

            case "UNKNOWN_ERROR":
                return "An unknown error occurred. Please try again."

            default:
                return ""
        }
    }

    return (
        <div className="my-4 px-6 py-8 bg-red-300 border-2 rounded-xl border-red-800 flex items-center justify-center">
            <p className="text-red-800">
                {getErrorMessage(errorType)}
            </p>
        </div>
    )
}