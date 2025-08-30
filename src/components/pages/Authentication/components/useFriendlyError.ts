export function useFriendlyError() {
  const errorMap: Record<string, string> = {
    // ForgotPassword 相關
    "Invalid email": "Email 格式錯誤",
    "Invalid email address": "Email 格式錯誤",
    "User not found": "此 Email 尚未註冊呦",
    "Failed to send reset password email": "腰獸寄送失敗，請稍後再試",

    // ResetPassword 相關
    "Password too short": "密碼需至少 8 碼",
    "Password must contain letters and numbers": "密碼需包含英文與數字",
    "Passwords do not match": "兩次輸入的密碼不一致",
    "Failed to update password": "密碼更新失敗，請稍後再試",
  };

  const getFriendlyError = (err: unknown): string => {
    if (err instanceof Error) {
      return errorMap[err.message] ?? "喔嗚什麼東西錯了喔";
    }
    return "發生未知錯誤，請稍後再試";
  };

  return { getFriendlyError };
}
