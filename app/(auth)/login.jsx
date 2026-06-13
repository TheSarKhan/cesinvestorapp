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
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Truck,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Eye,
  EyeOff,
} from 'lucide-react-native';

import { useAuthStore } from '../../src/store/authStore';
import { extractErrorMessage } from '../../src/api/client';

export default function LoginScreen() {
  const login = useAuthStore((s) => s.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const canSubmit = email.trim().length > 0 && password.length > 0 && !loading;

  const onSubmit = async () => {
    if (!canSubmit) return;
    setError('');
    setLoading(true);
    try {
      await login(email.trim(), password);
      // Uğurlu: status 'authenticated' olur → (auth) layout avtomatik dashboard-a yönləndirir.
    } catch (e) {
      setError(extractErrorMessage(e, 'E-poçt və ya şifrə yanlışdır.'));
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-bg">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Brend başlığı */}
          <LinearGradient
            colors={['#15A34A', '#0F8A3E']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.6, y: 1 }}
            style={{
              paddingTop: 72,
              paddingBottom: 34,
              paddingHorizontal: 28,
              borderBottomLeftRadius: 32,
              borderBottomRightRadius: 32,
              overflow: 'hidden',
            }}
          >
            <View className="h-[52px] w-[52px] items-center justify-center rounded-[15px] border border-white/25 bg-white/15">
              <Truck size={28} color="#fff" />
            </View>
            <Text className="mt-5 font-semibold text-[13px] tracking-widest text-white/85">
              INVORENT
            </Text>
            <Text className="mt-1 font-bold text-2xl text-white">
              İnvestor Portalı
            </Text>
            <Text className="mt-1.5 text-sm leading-5 text-white/80">
              Aktivləriniz, gəliriniz və ödənişləriniz — bir baxışda.
            </Text>
          </LinearGradient>

          {/* Form */}
          <View className="flex-1 px-6 pt-7">
            <Text className="font-bold text-xl text-ink">Daxil ol</Text>
            <Text className="mt-1 text-[13.5px] text-muted">
              Hesabınıza daxil olmaq üçün məlumatları daxil edin.
            </Text>

            <View className="mt-6">
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
                  className="flex-1 font-medium text-[14.5px] text-ink"
                />
              </Field>
            </View>

            <View className="mt-3.5">
              <Field
                label="Şifrə"
                icon={<Lock size={18} color={error ? '#DC2626' : '#9AA1AC'} />}
                error={!!error}
              >
                <TextInput
                  value={password}
                  onChangeText={(t) => {
                    setPassword(t);
                    setError('');
                  }}
                  placeholder="Şifrə"
                  placeholderTextColor="#9AA1AC"
                  secureTextEntry={!showPass}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onSubmitEditing={onSubmit}
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
            </View>

            {!!error && (
              <View className="mt-2.5 flex-row items-center gap-1.5">
                <AlertCircle size={15} color="#DC2626" />
                <Text className="font-semibold text-[12.5px] text-red">
                  {error}
                </Text>
              </View>
            )}

            <Pressable
              onPress={onSubmit}
              disabled={!canSubmit}
              className={`mt-8 h-[52px] flex-row items-center justify-center gap-2 rounded-2xl ${
                canSubmit ? 'bg-brand' : 'bg-brand/50'
              }`}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Text className="font-semibold text-[15px] text-white">
                    Daxil ol
                  </Text>
                  <ArrowRight size={18} color="#fff" />
                </>
              )}
            </Pressable>

            <View className="mb-6 mt-5 flex-row items-center justify-center gap-1.5">
              <ShieldCheck size={13} color="#9AA1AC" />
              <Text className="text-xs text-faint">
                256-bit şifrələmə ilə qorunur
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

function Field({ label, icon, error, children }) {
  return (
    <View>
      <Text className="mb-1.5 font-semibold text-[12.5px] text-ink-70">
        {label}
      </Text>
      <View
        className={`flex-row items-center gap-2.5 rounded-[13px] border bg-card px-3.5 py-3 ${
          error ? 'border-red' : 'border-line'
        }`}
        style={{ borderWidth: 1.5 }}
      >
        {icon}
        {children}
      </View>
    </View>
  );
}
