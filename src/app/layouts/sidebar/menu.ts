import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'Menü',
    isTitle: true
  },
  {
    id: 8,
    label: 'Uygulamalar',
    icon: 'ri-apps-2-line',
    subItems: [
      {
        id: 12,
        label: 'E-Ticaret',
        parentId: 8,
        subItems: [
          {
            id: 13,
            label: 'Ürünler',
            link: 'productList',
            parentId: 12
          },
          {
            id: 14,
            label: 'Ürün Ekle',
            link: 'add-product',
            parentId: 12
          },
          {
            id: 16,
            label: 'Kategoriler',
            link: 'categories',
            parentId: 12
          },
          {
            id: 17,
            label: 'Sipariş Listesi',
            link: 'orderList',
            parentId: 12
          },
          {
            id: 18,
            label: 'Sipariş Edilen Ürünler',
            link: 'orderedProducts',
            parentId: 12
          },
          {
            id: 19,
            label: 'Özellikler',
            link: 'attributes',
            parentId: 12
          },
          {
            id: 20,
            label: 'Ürün Fiyat Faktörü',
            link: 'product-pricefactor',
            parentId: 12
          },
          {
            id: 21,
            label: 'İlçe',
            link: 'district',
            parentId: 12
          },
          {
            id: 22,
            label: 'Site İçerikleri',
            link: 'site-contents',
            parentId: 12
          }
        ]
      }
    ]
  },
  {
    id: 54,
    label: 'Sayfalar',
    isTitle: true
  },
  {
    id: 55,
    label: 'Kimlik Doğrulama',
    icon: 'ri-account-circle-line',
    subItems: [
      {
        id: 56,
        label: 'Giriş',
        parentId: 55,
        subItems: [
          {
            id: 57,
            label: 'Basit',
            link: '/auth/signin/basic',
            parentId: 56
          },
          {
            id: 58,
            label: 'Kapak',
            link: '/auth/signin/cover',
            parentId: 56
          }
        ]
      },
      {
        id: 59,
        label: 'Kayıt Ol',
        parentId: 55,
        subItems: [
          {
            id: 60,
            label: 'Basit',
            link: '/auth/signup/basic',
            parentId: 59
          },
          {
            id: 61,
            label: 'Kapak',
            link: '/auth/signup/cover',
            parentId: 59
          }
        ]
      },
      {
        id: 62,
        label: 'Şifre Sıfırla',
        parentId: 55,
        subItems: [
          {
            id: 63,
            label: 'Basit',
            link: '/auth/pass-reset/basic',
            parentId: 62
          },
          {
            id: 64,
            label: 'Kapak',
            link: '/auth/pass-reset/cover',
            parentId: 62
          }
        ]
      },
      {
        id: 65,
        label: 'Şifre Oluştur',
        parentId: 55,
        subItems: [
          {
            id: 66,
            label: 'Basit',
            link: '/auth/pass-create/basic',
            parentId: 65
          },
          {
            id: 67,
            label: 'Kapak',
            link: '/auth/pass-create/cover',
            parentId: 65
          }
        ]
      },
      {
        id: 68,
        label: 'Kilit Ekranı',
        parentId: 55,
        subItems: [
          {
            id: 69,
            label: 'Basit',
            link: '/auth/lockscreen/basic',
            parentId: 68
          },
          {
            id: 70,
            label: 'Kapak',
            link: '/auth/lockscreen/cover',
            parentId: 68
          }
        ]
      },
      {
        id: 71,
        label: 'Çıkış',
        parentId: 55,
        subItems: [
          {
            id: 72,
            label: 'Basit',
            link: '/auth/logout/basic',
            parentId: 71
          },
          {
            id: 73,
            label: 'Kapak',
            link: '/auth/logout/cover',
            parentId: 71
          }
        ]
      },
      {
        id: 74,
        label: 'Başarı Mesajı',
        parentId: 55,
        subItems: [
          {
            id: 75,
            label: 'Basit',
            link: '/auth/success-msg/basic',
            parentId: 74
          },
          {
            id: 76,
            label: 'Kapak',
            link: '/auth/success-msg/cover',
            parentId: 74
          }
        ]
      },
      {
        id: 77,
        label: 'İki Adımlı Doğrulama',
        parentId: 55,
        subItems: [
          {
            id: 78,
            label: 'Basit',
            link: '/auth/twostep/basic',
            parentId: 77
          },
          {
            id: 79,
            label: 'Kapak',
            link: '/auth/twostep/cover',
            parentId: 77
          }
        ]
      },
      {
        id: 80,
        label: 'Hata Sayfaları',
        parentId: 55,
        subItems: [
          {
            id: 81,
            label: '404 Basit',
            link: '/auth/errors/404-basic',
            parentId: 80
          },
          {
            id: 82,
            label: '404 Kapak',
            link: '/auth/errors/404-cover',
            parentId: 80
          },
          {
            id: 83,
            label: '404 Alt',
            link: '/auth/errors/404-alt',
            parentId: 80
          },
          {
            id: 84,
            label: '500',
            link: '/auth/errors/page-500',
            parentId: 80
          },
          {
            id: 85,
            label: 'Çevrimdışı',
            link: '/auth/errors/offline',
            parentId: 80
          }
        ]
      }
    ]
  },
  {
    id: 96,
    label: 'Bileşenler',
    isTitle: true
  },
  {
    id: 121,
    label: 'Gelişmiş Arayüz',
    icon: 'ri-stack-line',
    subItems: [
      {
        id: 122,
        label: 'Sweet Alerts',
        link: 'advance-ui/sweetalerts',
        parentId: 121
      },
      {
        id: 124,
        label: 'Scrollbar',
        link: 'advance-ui/scrollbar',
        parentId: 121
      },
      {
        id: 125,
        label: 'Animasyon',
        link: 'advance-ui/animation',
        parentId: 121
      },
      {
        id: 126,
        label: 'Tur',
        link: 'advance-ui/tour',
        parentId: 121
      },
      {
        id: 127,
        label: 'Swiper Slider',
        link: 'advance-ui/swiper',
        parentId: 121
      },
      {
        id: 128,
        label: 'Puanlamalar',
        link: 'advance-ui/ratings',
        parentId: 121
      },
      {
        id: 129,
        label: 'Vurgu',
        link: 'advance-ui/highlight',
        parentId: 121
      },
      {
        id: 130,
        label: 'Scrollspy',
        link: 'advance-ui/scrollspy',
        parentId: 121
      }
    ]
  },
  {
    id: 132,
    label: 'Formlar',
    icon: 'ri-file-list-3-line',
    subItems: [
      {
        id: 133,
        label: 'Temel Elemanlar',
        link: 'forms/basic',
        parentId: 132
      },
      {
        id: 134,
        label: 'Form Seçim',
        link: 'forms/select',
        parentId: 132
      },
      {
        id: 135,
        label: 'Checkbox ve Radio',
        link: 'forms/checkboxs-radios',
        parentId: 132
      },
      {
        id: 136,
        label: 'Seçiciler',
        link: 'forms/pickers',
        parentId: 132
      },
      {
        id: 137,
        label: 'Giriş Maskeleri',
        link: 'forms/masks',
        parentId: 132
      },
      {
        id: 138,
        label: 'Gelişmiş',
        link: 'forms/advanced',
        parentId: 132
      },
      {
        id: 139,
        label: 'Aralık Kaydırıcı',
        link: 'forms/range-sliders',
        parentId: 132
      },
      {
        id: 140,
        label: 'Doğrulama',
        link: 'forms/validation',
        parentId: 132
      },
      {
        id: 141,
        label: 'Sihirbaz',
        link: 'forms/wizard',
        parentId: 132
      },
      {
        id: 142,
        label: 'Editörler',
        link: 'forms/editors',
        parentId: 132
      },
      {
        id: 143,
        label: 'Dosya Yükleme',
        link: 'forms/file-uploads',
        parentId: 132
      },
      {
        id: 144,
        label: 'Form Düzenleri',
        link: 'forms/layouts',
        parentId: 132
      }
    ]
  },
  {
    id: 169,
    label: 'İkonlar',
    icon: 'ri-compasses-2-line',
    subItems: [
      {
        id: 170,
        label: 'Remix',
        link: 'icons/remix',
        parentId: 169
      },
      {
        id: 171,
        label: 'Boxicons',
        link: 'icons/boxicons',
        parentId: 169
      },
      {
        id: 172,
        label: 'Material Design',
        link: 'icons/materialdesign',
        parentId: 169
      },
      {
        id: 173,
        label: 'Line Awesome',
        link: 'icons/lineawesome',
        parentId: 169
      },
      {
        id: 174,
        label: 'Feather',
        link: 'icons/feather',
        parentId: 169
      },
      {
        id: 175,
        label: 'Kripto SVG',
        link: 'icons/icons-crypto',
        parentId: 169
      }
    ]
  }
];
