import { useState } from 'react';
import { ScrollView, View, Text, TextInput, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogOut, Building2, Lock, CheckCircle2, AlertCircle } from 'lucide-react-native';
import { ScreenHeader, Card, InfoRow, Button, Skeleton } from '../../src/components';
import { useProfile, useChangePassword } from '../../src/hooks/usePortal';
import { useAuthStore } from '../../src/store/authStore';
import { extractErrorMessage } from '../../src/api/client';
import { azDate } from '../../src/utils/format';
import { colors } from '../../src/theme/colors';

export default function Profile() {
  const logout = useAuthStore((s) => s.logout);
  const fallback = useAuthStore((s) => s.investor);
  const { data, isLoading, refetch, isRefetching } = useProfile();
  const me = data ?? fallback;

  const [loggingOut, setLoggingOut] = useState(false);
  const onLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
    } catch {
      setLoggingOut(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={colors.brand} />
        }
      >
        <ScreenHeader title="Profil" />
        <View className="gap-4 px-[18px] pb-6">
          {/* Başlıq */}
          <Card className="flex-row items-center gap-3">
            <View
              style={{ backgroundColor: colors.brandTint }}
              className="h-12 w-12 items-center justify-center rounded-2xl"
            >
              <Building2 size={24} color={colors.brand} />
            </View>
            <View className="min-w-0 flex-1">
              <Text numberOfLines={1} className="font-bold text-base text-ink">
                {me?.companyName ?? 'İnvestor'}
              </Text>
              {!!me?.contactPerson && (
                <Text numberOfLines={1} className="text-[13px] text-muted">
                  {me.contactPerson}
                </Text>
              )}
            </View>
          </Card>

          {/* Məlumatlar */}
          {isLoading && !me ? (
            <Skeleton height={200} radius={18} />
          ) : (
            <Card className="py-1">
              <InfoRow label="E-poçt" value={me?.accountEmail ?? '—'} mono />
              <InfoRow label="VÖEN" value={me?.voen ?? '—'} mono />
              <InfoRow label="Əlaqə şəxsi" value={me?.contactPerson ?? '—'} />
              <InfoRow label="Telefon" value={me?.contactPhone ?? '—'} mono />
              <InfoRow label="Ünvan" value={me?.address ?? '—'} />
              <InfoRow
                label="Son giriş"
                value={me?.lastLoginAt ? azDate(me.lastLoginAt) : '—'}
                mono
                last
              />
            </Card>
          )}

          {/* Şifrə dəyişmə */}
          <ChangePasswordCard />

          <Button
            variant="danger"
            full
            loading={loggingOut}
            onPress={onLogout}
            icon={<LogOut size={18} color={colors.red} />}
          >
            Çıxış et
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ChangePasswordCard() {
  const mutation = useChangePassword();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const submit = () => {
    setError('');
    setDone(false);
    if (newPassword.length < 8) {
      setError('Yeni şifrə ən azı 8 simvol olmalıdır.');
      return;
    }
    if (newPassword !== confirm) {
      setError('Yeni şifrələr uyğun gəlmir.');
      return;
    }
    mutation.mutate(
      { oldPassword, newPassword },
      {
        onSuccess: () => {
          setDone(true);
          setOldPassword('');
          setNewPassword('');
          setConfirm('');
        },
        onError: (e) => setError(extractErrorMessage(e, 'Şifrə dəyişdirilmədi.')),
      }
    );
  };

  const canSubmit =
    oldPassword.length > 0 && newPassword.length > 0 && confirm.length > 0 && !mutation.isPending;

  return (
    <Card className="gap-3">
      <View className="flex-row items-center gap-2">
        <Lock size={18} color={colors.ink70} />
        <Text className="font-bold text-[15px] text-ink">Şifrəni dəyiş</Text>
      </View>

      <PassInput value={oldPassword} onChangeText={setOldPassword} placeholder="Köhnə şifrə" />
      <PassInput value={newPassword} onChangeText={setNewPassword} placeholder="Yeni şifrə (min 8)" />
      <PassInput value={confirm} onChangeText={setConfirm} placeholder="Yeni şifrəni təkrarla" />

      {!!error && (
        <View className="flex-row items-center gap-1.5">
          <AlertCircle size={14} color={colors.red} />
          <Text className="font-semibold text-[12.5px] text-red">{error}</Text>
        </View>
      )}
      {done && (
        <View className="flex-row items-center gap-1.5">
          <CheckCircle2 size={14} color={colors.green} />
          <Text className="font-semibold text-[12.5px] text-green">Şifrə dəyişdirildi.</Text>
        </View>
      )}

      <Button full sm loading={mutation.isPending} disabled={!canSubmit} onPress={submit}>
        Yadda saxla
      </Button>
    </Card>
  );
}

function PassInput(props) {
  return (
    <TextInput
      secureTextEntry
      autoCapitalize="none"
      autoCorrect={false}
      placeholderTextColor={colors.faint}
      className="rounded-[13px] border border-line bg-card px-3.5 py-3 font-medium text-[14.5px] text-ink"
      style={{ borderWidth: 1.5 }}
      {...props}
    />
  );
}
