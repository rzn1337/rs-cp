export default function validatePassword(password: string) {
    // Minimum six characters, no specific requirements
    const regex = /^.{6,}$/;
    return regex.test(password);
}
