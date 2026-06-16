import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  ArrowLeft,
  Mail,
  KeyRound,
  Lock,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Eye,
  EyeOff,
} from 'lucide-react-native';

import { forgotPassword, verifyOtp, resetPassword } from '../src/api/auth';
import { extractErrorMessage } from '../src/api/client';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [step, setStep] = useState('email'); // email | otp | reset
  const [email, setEmail] = useState(typeof params.email === 'string' ? params.email : '');
  const [otp, setOtp] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const sendOtp = async () => {
    if (!email.trim() || loading) return;
    setError('');
    setLoading(true);
    try {
      await forgotPassword(email.trim());
      setOtp('');
      setStep('otp');
    } catch (e) {
      setError(extractErrorMessage(e, 'Kod göndərilmədi.'));
    } finally {
      setLoading(false);
    }
  };

  const confirmOtp = async () => {
    if (loading) return;
    if (otp.trim().length !== 6) {
      setError('6 rəqəmli kodu daxil edin.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await verifyOtp(email.trim(), otp.trim());
      setToken(res.verificationToken);
      setStep('reset');
    } catch (e) {
      setError(extractErrorMessage(e, 'Kod yanlışdır və ya vaxtı keçib.'));
    } finally {
      setLoading(false);
    }
  };

  const submitReset = async () => {
    if (loading) return;
    if (newPassword.length < 8) {
      setError('Yeni şifrə ən azı 8 simvol olmalıdır.');
      return;
    }
    if (newPassword !== confirm) {
      setError('Şifrələr uyğun gəlmir.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await resetPassword(token, newPassword);
      setDone(true);
    } catch (e) {
      setError(extractErrorMessage(e, 'Şifrə yenilənmədi.'));
    } finally {
      setLoading(false);
    }
  };

  const title =
    step === 'email' ? 'Şifrəni unutmusan?' : step === 'otp' ? 'Kodu daxil et' : 'Yeni şifrə';
  const subtitle =
    step === 'email'
      ? 'Email ünvanını yaz — sənə 6 rəqəmli təsdiq kodu göndərək.'
      : step === 'otp'
        ? `${email} ünvanına göndərilən 6 rəqəmli kodu daxil et.`
        : 'Yeni şifrəni təyin et (ən azı 8 simvol).';

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Geri düyməsi */}
          <View className="px-5 pt-2">
            <Pressable
              hitSlop={10}
              onPress={() => router.back()}
              className="h-10 w-10 items-center justify-center rounded-full"
            >
              <ArrowLeft size={22} color="#1F2430" />
            </Pressable>
          </View>

          <View className="flex-1 px-6 pt-4">
            {done ? (
              <View className="flex-1 items-center justify-center gap-4 pb-20">
                <View className="h-16 w-16 items-center justify-center rounded-3xl bg-green/15">
                  <CheckCircle2 size={36} color="#15A34A" />
                </View>
                <Text className="text-center font-bold text-xl text-ink">Şifrə yeniləndi</Text>
                <Text className="text-center text-[13.5px] leading-5 text-muted">
                  Yeni şifrənlə daxil ola bilərsən.
                </Text>
                <Pressable
                  onPress={() => router.back()}
                  className="mt-2 h-[52px] w-full flex-row items-center justify-center gap-2 rounded-2xl bg-brand"
                >
                  <Text className="font-semibold text-[15px] text-white">Girişə qayıt</Text>
                  <ArrowRight size={18} color="#fff" />
                </Pressable>
              </View>
            ) : (
              <>
                <Text className="font-bold text-2xl text-ink">{title}</Text>
                <Text className="mt-1.5 text-[13.5px] leading-5 text-muted">{subtitle}</Text>

                <View className="mt-7 gap-3.5">
                  {step === 'email' && (
                    <Field label="E-poçt" icon={<Mail size={18} color="#9AA1AC" />}>
                      <TextInput
                        value={email}
                        onChangeText={(t) => {
                          setEmail(t);
                          setError('');
                        }}
                        placeholder="ad@sirket.az"
                        placeholderTextColor="#9AA1AC"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onSubmitEditing={sendOtp}
                        className="flex-1 font-medium text-[14.5px] text-ink"
                      />
                    </Field>
                  )}

                  {step === 'otp' && (
                    <Field label="Təsdiq kodu" icon={<KeyRound size={18} color="#9AA1AC" />}>
                      <TextInput
                        value={otp}
                        onChangeText={(t) => {
                          setOtp(t.replace(/[^0-9]/g, '').slice(0, 6));
                          setError('');
                        }}
                        placeholder="000000"
                        placeholderTextColor="#9AA1AC"
                        keyboardType="number-pad"
                        maxLength={6}
                        onSubmitEditing={confirmOtp}
                        className="flex-1 font-mono text-lg tracking-[6px] text-ink"
                      />
                    </Field>
                  )}

                  {step === 'reset' && (
                    <>
                      <Field label="Yeni şifrə" icon={<Lock size={18} color="#9AA1AC" />}>
                        <TextInput
                          value={newPassword}
                          onChangeText={(t) => {
                            setNewPassword(t);
                            setError('');
                          }}
                          placeholder="Yeni şifrə (min 8)"
                          placeholderTextColor="#9AA1AC"
                          secureTextEntry={!showPass}
                          autoCapitalize="none"
                          autoCorrect={false}
                          className="flex-1 font-medium text-[14.5px] text-ink"
                        />
                        <Pressable hitSlop={8} onPress={() => setShowPass((v) => !v)}>
                          {showPass ? (
                            <EyeOff size={18} color="#9AA1AC" />
                          ) : (
                            <Eye size={18} color="#9AA1AC" />
                          )}
                        </Pressable>
                      </Field>
                      <Field label="Şifrəni təkrarla" icon={<Lock size={18} color="#9AA1AC" />}>
                        <TextInput
                          value={confirm}
                          onChangeText={(t) => {
                            setConfirm(t);
                            setError('');
                          }}
                          placeholder="Yeni şifrəni təkrarla"
                          placeholderTextColor="#9AA1AC"
                          secureTextEntry={!showPass}
                          autoCapitalize="none"
                          autoCorrect={false}
                          onSubmitEditing={submitReset}
                          className="flex-1 font-medium text-[14.5px] text-ink"
                        />
                      </Field>
                    </>
                  )}
                </View>

                {!!error && (
                  <View className="mt-2.5 flex-row items-center gap-1.5">
                    <AlertCircle size={15} color="#DC2626" />
                    <Text className="font-semibold text-[12.5px] text-red">{error}</Text>
                  </View>
                )}

                <Pressable
                  onPress={step === 'email' ? sendOtp : step === 'otp' ? confirmOtp : submitReset}
                  disabled={loading}
                  className={`mt-8 h-[52px] flex-row items-center justify-center gap-2 rounded-2xl ${
                    loading ? 'bg-brand/50' : 'bg-brand'
                  }`}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <>
                      <Text className="font-semibold text-[15px] text-white">
                        {step === 'email' ? 'Kod göndər' : step === 'otp' ? 'Təsdiqlə' : 'Şifrəni yenilə'}
                      </Text>
                      <ArrowRight size={18} color="#fff" />
                    </>
                  )}
                </Pressable>

                {step === 'otp' && (
                  <Pressable hitSlop={8} onPress={sendOtp} disabled={loading} className="mt-5 self-center">
                    <Text className="font-semibold text-[13px] text-brand">Kodu yenidən göndər</Text>
                  </Pressable>
                )}
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Field({ label, icon, children }) {
  return (
    <View>
      <Text className="mb-1.5 font-semibold text-[12.5px] text-ink-70">{label}</Text>
      <View
        className="flex-row items-center gap-2.5 rounded-[13px] border border-line bg-card px-3.5 py-3"
        style={{ borderWidth: 1.5 }}
      >
        {icon}
        {children}
      </View>
    </View>
  );
}
