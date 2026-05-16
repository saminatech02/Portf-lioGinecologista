const globalOtpStore =
  globalThis.__otpStore || new Map();

globalThis.__otpStore =
  globalOtpStore;

export default globalOtpStore;