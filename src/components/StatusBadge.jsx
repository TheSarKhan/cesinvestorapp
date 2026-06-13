import { View, Text } from 'react-native';
import {
  EQ_STATUS,
  INVOICE_STATUS,
  PAYABLE_STATUS,
  resolveStatus,
} from '../theme/status';

// ui.jsx Badge portu — nöqtə + etiket pill. Rənglər dinamik (hex) → inline style.
export function StatusBadge({ map, status, sm = false }) {
  const m = resolveStatus(map, status);
  return (
    <View
      style={{ backgroundColor: m.tint }}
      className={`flex-row items-center self-start rounded-full ${
        sm ? 'px-2 py-0.5' : 'px-2.5 py-1'
      }`}
    >
      <View
        style={{ backgroundColor: m.color }}
        className="mr-1.5 h-1.5 w-1.5 rounded-full"
      />
      <Text
        style={{ color: m.color }}
        className={`font-semibold ${sm ? 'text-[11px]' : 'text-xs'}`}
      >
        {m.label}
      </Text>
    </View>
  );
}

export const EqBadge = (p) => <StatusBadge map={EQ_STATUS} {...p} />;
export const InvoiceBadge = (p) => <StatusBadge map={INVOICE_STATUS} {...p} />;
export const PayableBadge = (p) => <StatusBadge map={PAYABLE_STATUS} {...p} />;

export default StatusBadge;
