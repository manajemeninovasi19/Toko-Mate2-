import { Product, DaySales, Cashier, Transaction } from '../types';

export const LOGO_URL = "/assets/aistudio/WhatsApp_Image_2026-10-28_at_15.44.17_ca098ac3.jpeg";
export const AVATAR_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuBRE7WahoaoJlEvFCMdPWQzmPmsieBLWPI6uA-UWsTrX85yOno-7BNG8Ih5txDkSebf5QhycOfoMpMLl3yvelop8IBQzYsaQ-mz77QImTHyrS5APT_Zhgl6DkQZyBk8x8pmAyCyhZrMibm6Jra1w4Wp-8mC0WB7NLEvraW7Eo4L5rI7Ai9TOPbVtZY5iL2f2qnDBrMujP6ipSLXZp63rnE1ApoGEBF_WSu4dfA2sNOCnL0xSyLWsxOG";

export const INITIAL_CASHIERS: Cashier[] = [
  {
    id: 'kasir-1',
    name: 'Budi Santoso',
    phone: '0812-3456-7890',
    role: 'Kasir Kepala',
    shift: 'Shift 1 (Pagi)',
    avatar: AVATAR_URL,
    isActive: true,
    pin: '1234',
  },
  {
    id: 'kasir-2',
    name: 'Siti Aminah',
    phone: '0857-8901-2345',
    role: 'Kasir',
    shift: 'Shift 2 (Siang)',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    isActive: false,
    pin: '2345',
  },
  {
    id: 'kasir-3',
    name: 'Ahmad Fauzi',
    phone: '0813-9988-7766',
    role: 'Kasir Pengganti',
    shift: 'Shift 3 (Malam)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    isActive: false,
    pin: '3456',
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Aqua 600ml',
    category: 'Minuman',
    price: 5000,
    costPrice: 3800,
    stock: 42,
    minStock: 12,
    unit: 'btl',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQHh90vAsWtoUwtyh6anIslYl5lwqksdhU5yxUj02xatDJpuR0EbsEwn8vkCAY5JRfZbemHvEcMjwNC_SU7R0Ydl4A_ReRgWgk6rEcn5BaIQjqP7RVeB49r6REbQMLkZJ46u5zrIrILMdJ6sE-IeVKYpAKLSt6SGn_63KRUlL2GvVEnw59Ozvdkr-gT7p5NT2bVH0nI425knvjC8uf54WSJYBmlchuN-Z-GZvYDEN6BXy12EPco41Q',
    soldCount: 18,
  },
  {
    id: 'prod-2',
    name: 'Mie Instan Goreng',
    category: 'Makanan',
    price: 3000,
    costPrice: 2400,
    stock: 35,
    minStock: 10,
    unit: 'bks',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDajL-piTFplM4MPIPCt0nzu1hbAYq1CM7E5ikUNxc5A0HFuS60eNnSZt_QUqP2KRaxHFP9m_bLaZRkWAVYnrnPCKZ6O15nPpUpniYO-9hc0XVET1U7HWfC64aQ_Ez8y0fz7n_oiQOdNjuotIVB7SiPVCKX3DwPQcDasPAu0VmuxEe45moM9S0jpuXm0lKmNggvzx0rmfuE5nQXdIo7mdApr-aE3uoiLBsQUa87yO_dyJfcEDT9_3m1',
    soldCount: 12,
  },
  {
    id: 'prod-3',
    name: 'Roti Tawar Kupas',
    category: 'Roti & Kue',
    price: 12000,
    costPrice: 9500,
    stock: 15,
    minStock: 5,
    unit: 'bks',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAn_Gel7li2m7gjpHgrnfco_az_TyVB_H-BfauI-zc28I9lPzOvCJNojUkttoXRUy_janHGTpJpLrTz5vTxvHc0OuWlKuJuf3VyEnmL_asGJTBmr8c7-9EB-tpR4QCe_4dYGiC0d_u3JfIvXDNvx_3Dj5-mPcsj_bSaGwMa4JMmAcVW95oMHvGmolrHm2TOtWRhjLr2Ahg44wWZz0Zr3tP_scKUYlXbQYkgnmzMUHy8W6W-2638QyK6',
    soldCount: 6,
  },
  {
    id: 'prod-4',
    name: 'Minyak Goreng 1L',
    category: 'Sembako',
    price: 18500,
    costPrice: 16000,
    stock: 3,
    minStock: 10,
    unit: 'bks',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&auto=format&fit=crop&q=60',
    soldCount: 4,
  },
  {
    id: 'prod-5',
    name: 'Telur Ayam 1kg',
    category: 'Sembako',
    price: 29000,
    costPrice: 25000,
    stock: 2,
    minStock: 5,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=200&auto=format&fit=crop&q=60',
    soldCount: 3,
  },
  {
    id: 'prod-6',
    name: 'Gula Pasir Gulaku 1kg',
    category: 'Sembako',
    price: 17500,
    costPrice: 15200,
    stock: 18,
    minStock: 8,
    unit: 'bks',
    image: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=200&auto=format&fit=crop&q=60',
    soldCount: 2,
  },
  {
    id: 'prod-7',
    name: 'Teh Botol Sosro 350ml',
    category: 'Minuman',
    price: 4500,
    costPrice: 3300,
    stock: 28,
    minStock: 10,
    unit: 'btl',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200&auto=format&fit=crop&q=60',
    soldCount: 5,
  },
  {
    id: 'prod-8',
    name: 'Kopi Kapal Api Spesial 165g',
    category: 'Minuman',
    price: 14000,
    costPrice: 11800,
    stock: 22,
    minStock: 6,
    unit: 'bks',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=200&auto=format&fit=crop&q=60',
    soldCount: 3,
  },
  {
    id: 'prod-9',
    name: 'Beras Pandan Wangi 5kg',
    category: 'Sembako',
    price: 74000,
    costPrice: 65000,
    stock: 8,
    minStock: 4,
    unit: 'sak',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&auto=format&fit=crop&q=60',
    soldCount: 1,
  },
  {
    id: 'prod-10',
    name: 'Sabun Cuci Piring Sunlight 700ml',
    category: 'Kebutuhan',
    price: 15500,
    costPrice: 13000,
    stock: 14,
    minStock: 5,
    unit: 'pch',
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=200&auto=format&fit=crop&q=60',
    soldCount: 2,
  },
  {
    id: 'prod-11',
    name: 'Susu Kental Manis Frisian Flag 370g',
    category: 'Makanan',
    price: 13000,
    costPrice: 10800,
    stock: 20,
    minStock: 8,
    unit: 'klg',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&auto=format&fit=crop&q=60',
    soldCount: 4,
  },
  {
    id: 'prod-12',
    name: 'Biskuit Roma Kelapa 300g',
    category: 'Roti & Kue',
    price: 11500,
    costPrice: 9200,
    stock: 16,
    minStock: 6,
    unit: 'bks',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200&auto=format&fit=crop&q=60',
    soldCount: 3,
  }
];

export const ID_DAYS_SHORT = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
export const ID_DAYS_FULL = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
export const ID_MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
export const ID_MONTHS_FULL = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

/**
 * Safely extracts Date from transaction by createdAt, receiptNo, or id
 */
export function getTransactionDate(t: Transaction): Date | null {
  if (t.createdAt) {
    try {
      const d = new Date(t.createdAt);
      if (!isNaN(d.getTime())) return d;
    } catch {
      // ignore parsing error
    }
  }

  // Try extracting from receiptNo e.g. "INV/20261021/0018"
  if (t.receiptNo) {
    const match = t.receiptNo.match(/INV\/(\d{4})(\d{2})(\d{2})\//);
    if (match) {
      const year = parseInt(match[1], 10);
      const month = parseInt(match[2], 10) - 1;
      const day = parseInt(match[3], 10);
      return new Date(year, month, day);
    }
  }

  // Try extracting from id e.g. "TRX-20261021-0018"
  if (t.id) {
    const match = t.id.match(/TRX-(\d{4})(\d{2})(\d{2})-/);
    if (match) {
      const year = parseInt(match[1], 10);
      const month = parseInt(match[2], 10) - 1;
      const day = parseInt(match[3], 10);
      return new Date(year, month, day);
    }
    const timeMatch = t.id.match(/TRX-(\d{13})/);
    if (timeMatch) {
      const d = new Date(parseInt(timeMatch[1], 10));
      if (!isNaN(d.getTime())) return d;
    }
  }

  return null;
}

/**
 * Accurately determines if a transaction occurred on a given calendar date
 */
function isTransactionOnDate(t: Transaction, d: Date): boolean {
  const tDate = getTransactionDate(t);
  if (!tDate) return false;
  return (
    tDate.getFullYear() === d.getFullYear() &&
    tDate.getMonth() === d.getMonth() &&
    tDate.getDate() === d.getDate()
  );
}

/**
 * Generates 7 real-time days leading up to today with accurate dates in the current month (e.g. Oktober)
 * Automatically aggregates actual transactions made in real-time.
 */
export function getRealtimeWeeklySales(transactions: Transaction[] = [], totalSales: number = 0): DaySales[] {
  const result: DaySales[] = [];
  const now = new Date();

  let maxSales = 0;
  let peakIndex = -1;

  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() - (6 - i));
    const dayCode = ID_DAYS_SHORT[d.getDay()];
    const dayLabel = ID_DAYS_FULL[d.getDay()];
    const fullDate = `${dayLabel}, ${d.getDate()} ${ID_MONTHS_SHORT[d.getMonth()]}`;

    // Filter real transactions matching this day
    const dayTrxs = (transactions || []).filter((t) => isTransactionOnDate(t, d));

    const realDaySales = dayTrxs.reduce((sum, t) => sum + t.total, 0);
    const realDayCount = dayTrxs.length;

    if (realDaySales > maxSales) {
      maxSales = realDaySales;
      peakIndex = i;
    }

    result.push({
      dayCode,
      dayLabel,
      fullDate,
      sales: realDaySales,
      transactions: realDayCount,
      isPeak: false,
    });
  }

  if (peakIndex >= 0 && maxSales > 0 && result[peakIndex]) {
    result[peakIndex].isPeak = true;
  }

  return result;
}

/**
 * Generates monthly sales breakdown (4 weeks of the current month)
 * 100% synchronized with actual transactions.
 */
export function getRealtimeMonthlySales(transactions: Transaction[] = [], totalSales: number = 0): DaySales[] {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const monthShort = ID_MONTHS_SHORT[currentMonth];

  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const weeks = [
    { code: 'M1', label: 'Minggu 1', range: `1 - 7 ${monthShort}`, start: 1, end: 7 },
    { code: 'M2', label: 'Minggu 2', range: `8 - 14 ${monthShort}`, start: 8, end: 14 },
    { code: 'M3', label: 'Minggu 3', range: `15 - 21 ${monthShort}`, start: 15, end: 21 },
    { code: 'M4', label: 'Minggu 4', range: `22 - ${lastDayOfMonth} ${monthShort}`, start: 22, end: lastDayOfMonth },
  ];

  let maxSales = 0;
  let peakIndex = -1;

  const result: DaySales[] = weeks.map((w, idx) => {
    // Filter actual transactions falling in this week of current month
    const weekTrxs = (transactions || []).filter((t) => {
      const tDate = getTransactionDate(t);
      if (!tDate) return false;
      return (
        tDate.getFullYear() === currentYear &&
        tDate.getMonth() === currentMonth &&
        tDate.getDate() >= w.start &&
        tDate.getDate() <= w.end
      );
    });

    const sales = weekTrxs.reduce((sum, t) => sum + t.total, 0);
    const trxsCount = weekTrxs.length;

    if (sales > maxSales) {
      maxSales = sales;
      peakIndex = idx;
    }

    return {
      dayCode: w.code,
      dayLabel: w.label,
      fullDate: w.range,
      sales,
      transactions: trxsCount,
      isPeak: false,
    };
  });

  if (peakIndex >= 0 && maxSales > 0 && result[peakIndex]) {
    result[peakIndex].isPeak = true;
  }

  return result;
}

/**
 * Generates Year-To-Date (YTD) sales breakdown (Jan to current month of current year)
 * 100% synchronized with actual transactions.
 */
export function getRealtimeYtdSales(transactions: Transaction[] = [], totalSales: number = 0): DaySales[] {
  const now = new Date();
  const currentMonthIdx = now.getMonth();
  const currentYear = now.getFullYear();

  const result: DaySales[] = [];
  let maxSales = 0;
  let peakIdx = -1;

  // Show months up to current month (e.g. Jan - Okt)
  const monthsToShow = currentMonthIdx + 1;

  for (let i = 0; i < monthsToShow; i++) {
    const monthShort = ID_MONTHS_SHORT[i];
    const monthFull = ID_MONTHS_FULL[i];
    const isCurrent = i === currentMonthIdx;

    // Filter actual transactions for this month in current year
    const monthTrxs = (transactions || []).filter((t) => {
      const tDate = getTransactionDate(t);
      if (!tDate) return false;
      return tDate.getFullYear() === currentYear && tDate.getMonth() === i;
    });

    const sales = monthTrxs.reduce((sum, t) => sum + t.total, 0);
    const trxsCount = monthTrxs.length;

    const fullDate = isCurrent
      ? `1 - ${now.getDate()} ${monthFull} ${currentYear}`
      : `${monthFull} ${currentYear}`;

    if (sales > maxSales) {
      maxSales = sales;
      peakIdx = i;
    }

    result.push({
      dayCode: monthShort,
      dayLabel: monthFull,
      fullDate,
      sales,
      transactions: trxsCount,
      isPeak: false,
    });
  }

  if (peakIdx >= 0 && maxSales > 0 && result[peakIdx]) {
    result[peakIdx].isPeak = true;
  }

  return result;
}

export function generateCustomSalesData(
  startDateStr: string,
  endDateStr: string,
  transactions: Transaction[] = [],
  totalSales: number = 0
): DaySales[] {
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);

  if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
    return getRealtimeWeeklySales(transactions, totalSales);
  }

  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const daysDiff = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1);

  const result: DaySales[] = [];
  const count = Math.min(daysDiff, 14);
  const step = Math.max(1, Math.floor(daysDiff / count));

  let maxSales = 0;
  let peakIndex = -1;

  for (let i = 0; i < count; i++) {
    const d = new Date(start.getTime() + i * step * (1000 * 60 * 60 * 24));
    if (d > end) break;

    const dayCode = `${ID_DAYS_SHORT[d.getDay()]} ${d.getDate()}`;
    const fullDate = `${ID_DAYS_FULL[d.getDay()]}, ${d.getDate()} ${ID_MONTHS_SHORT[d.getMonth()]}`;

    // Filter real transactions matching this exact day
    const dayTrxs = (transactions || []).filter((t) => isTransactionOnDate(t, d));

    const realSales = dayTrxs.reduce((sum, t) => sum + t.total, 0);
    const realCount = dayTrxs.length;

    if (realSales > maxSales) {
      maxSales = realSales;
      peakIndex = i;
    }

    result.push({
      dayCode,
      dayLabel: ID_DAYS_FULL[d.getDay()],
      fullDate,
      sales: realSales,
      transactions: realCount,
      isPeak: false,
    });
  }

  // Only assign isPeak if there was an actual positive sale!
  if (peakIndex >= 0 && maxSales > 0 && result[peakIndex]) {
    result[peakIndex].isPeak = true;
  }

  return result.length > 0 ? result : getRealtimeWeeklySales(transactions, totalSales);
}

// Backward-compatible exports populated dynamically with current real-time dates
export const WEEKLY_SALES_DATA: DaySales[] = getRealtimeWeeklySales();
export const MONTHLY_SALES_DATA: DaySales[] = getRealtimeMonthlySales();
export const YTD_SALES_DATA: DaySales[] = getRealtimeYtdSales();

/**
 * Creates sample initial transactions stamped with real-time current date
 */
export function getInitialTransactions(): Transaction[] {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const datePrefix = `${yyyy}${mm}${dd}`;

  return [
    {
      id: `TRX-${datePrefix}-0018`,
      receiptNo: `INV/${datePrefix}/0018`,
      timestamp: '14:22 WIB',
      customerName: 'Pelanggan Umum',
      cashierName: 'Budi Santoso',
      items: [
        { product: INITIAL_PRODUCTS[0], quantity: 2 },
        { product: INITIAL_PRODUCTS[1], quantity: 3 },
      ],
      subtotal: 19000,
      discount: 0,
      tax: 0,
      total: 19000,
      paymentMethod: 'qris' as const,
      createdAt: new Date(now.getTime() - 25 * 60 * 1000).toISOString(),
    },
    {
      id: `TRX-${datePrefix}-0017`,
      receiptNo: `INV/${datePrefix}/0017`,
      timestamp: '13:50 WIB',
      customerName: 'Ibu Ratna',
      cashierName: 'Budi Santoso',
      items: [
        { product: INITIAL_PRODUCTS[2], quantity: 1 },
        { product: INITIAL_PRODUCTS[3], quantity: 1 },
      ],
      subtotal: 30500,
      discount: 0,
      tax: 0,
      total: 30500,
      paymentMethod: 'cash' as const,
      cashTendered: 50000,
      change: 19500,
      createdAt: new Date(now.getTime() - 55 * 60 * 1000).toISOString(),
    },
    {
      id: `TRX-${datePrefix}-0016`,
      receiptNo: `INV/${datePrefix}/0016`,
      timestamp: '12:15 WIB',
      customerName: 'Pak Joko',
      cashierName: 'Budi Santoso',
      items: [
        { product: INITIAL_PRODUCTS[0], quantity: 4 },
        { product: INITIAL_PRODUCTS[4], quantity: 1 },
      ],
      subtotal: 49000,
      discount: 0,
      tax: 0,
      total: 49000,
      paymentMethod: 'qris' as const,
      createdAt: new Date(now.getTime() - 150 * 60 * 1000).toISOString(),
    },
  ];
}

export const INITIAL_TRANSACTIONS = getInitialTransactions();

export function formatRupiah(amount: number): string {
  return 'Rp ' + amount.toLocaleString('id-ID');
}
