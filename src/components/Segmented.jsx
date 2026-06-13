import { View, Text, Pressable } from 'react-native';

// ui.jsx Segmented portu — daxili seqment tablar.
// tabs: [{ value, label }]
export function Segmented({ tabs, value, onChange, className = '' }) {
  return (
    <View className={`flex-row gap-1 rounded-xl bg-bg-sunk p-1 ${className}`}>
      {tabs.map((t) => {
        const active = value === t.value;
        return (
          <Pressable
            key={t.value}
            onPress={() => onChange(t.value)}
            className={`flex-1 items-center rounded-[9px] py-2 ${
              active ? 'bg-card' : ''
            }`}
            style={
              active
                ? {
                    shadowColor: '#141821',
                    shadowOpacity: 0.1,
                    shadowRadius: 3,
                    shadowOffset: { width: 0, height: 1 },
                    elevation: 1,
                  }
                : null
            }
          >
            <Text
              className={`font-semibold text-[13px] ${active ? 'text-ink' : 'text-muted'}`}
            >
              {t.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default Segmented;
