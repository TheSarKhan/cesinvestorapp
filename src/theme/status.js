// Status → {label, color, tint} xəritələri.
// DİQQƏT: backend enum-ları Jackson ilə name() kimi serialize olunur (məs. "AVAILABLE").
// Açarlar = enum adları (BÖYÜK), label-lar backend enum tərifindəki Azərbaycan etiketləri.
import { colors as C } from './colors';

// EquipmentStatus
export const EQ_STATUS = {
  AVAILABLE: { label: 'Mövcuddur', color: C.green, tint: C.greenTint },
  RENTED: { label: 'İcarədə', color: C.amber, tint: C.amberTint },
  IN_TRANSIT: { label: 'Yoldadır', color: C.blue, tint: C.blueTint },
  IN_INSPECTION: { label: 'Servisdədir', color: C.purple, tint: C.purpleTint },
  UNDER_CHECK: { label: 'Baxışda', color: C.purple, tint: C.purpleTint },
  IN_REPAIR: { label: 'Təmirdə', color: C.red, tint: C.redTint },
  DEFECTIVE: { label: 'Nasaz', color: C.red, tint: C.redTint },
  OUT_OF_SERVICE: { label: 'İstismardan çıxıb', color: C.gray, tint: C.grayTint },
};

// InvoiceStatus
export const INVOICE_STATUS = {
  DRAFT: { label: 'Qaralama', color: C.gray, tint: C.grayTint },
  SENT: { label: 'Göndərilib', color: C.blue, tint: C.blueTint },
  APPROVED: { label: 'Təsdiqlənib', color: C.green, tint: C.greenTint },
  RETURNED: { label: 'Geri qaytarılıb', color: C.amber, tint: C.amberTint },
};

// PayableStatus
export const PAYABLE_STATUS = {
  PENDING: { label: 'Ödəniş gözlənilir', color: C.amber, tint: C.amberTint },
  PARTIAL: { label: 'Qismən ödənilib', color: C.blue, tint: C.blueTint },
  OVERDUE: { label: 'Gecikib', color: C.red, tint: C.redTint },
  COMPLETED: { label: 'Tam ödənilib', color: C.green, tint: C.greenTint },
};

// Naməlum status üçün fallback
export function resolveStatus(map, status) {
  return map[status] || { label: status ?? '—', color: C.gray, tint: C.grayTint };
}
