import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENUITEMS.MENU.TEXT',
    isTitle: true
  },
  {
    id: 8,
    label: 'MENUITEMS.APPS.TEXT',
    icon: 'ri-apps-2-line',
    subItems: [
      {
        id: 12,
        label: 'MENUITEMS.APPS.LIST.ECOMMERCE',
        parentId: 8,
        subItems: [
          {
            id: 13,
            label: 'MENUITEMS.APPS.LIST.PRODUCTS',
            link: 'productList',
            parentId: 12
          },
          {
            id: 14,
            label: 'MENUITEMS.APPS.LIST.CREATEPRODUCT',
            link: 'add-product',
            parentId: 12
          },
          {
            id: 16,
            label: 'MENUITEMS.APPS.LIST.CATEGORIES',
            link: 'categories',
            parentId: 12
          },
          {
            id: 17,
            label: 'MENUITEMS.APPS.LIST.ORDERLIST',
            link: 'orderList',
            parentId: 12
          },
          {
            id: 18,
            label: 'MENUITEMS.APPS.LIST.ORDEREDPRODUCTS',
            link: 'orderedProducts',
            parentId: 12
          },
          {
            id: 19,
            label: 'MENUITEMS.APPS.LIST.ATTRIBUTES',
            link: 'attributes',
            parentId: 12
          },
          {
            id: 19,
            label: 'MENUITEMS.APPS.LIST.PRODUCTPRICEFACTOR',
            link: 'product-pricefactor',
            parentId: 12
          },
          {
            id: 19,
            label: 'MENUITEMS.APPS.LIST.DISTRICT',
            link: 'district',
            parentId: 12
          },
          {
            id: 20,
            label: 'MENUITEMS.APPS.LIST.SITECONTENTS',
            link: 'site-contents',
            parentId: 12
          }


        ]
      }
    ]
  },
  {
    id: 54,
    label: 'MENUITEMS.PAGES.TEXT',
    isTitle: true
  },
  {
    id: 55,
    label: 'MENUITEMS.AUTHENTICATION.TEXT',
    icon: 'ri-account-circle-line',
    subItems: [
      {
        id: 56,
        label: 'MENUITEMS.AUTHENTICATION.LIST.SIGNIN',
        parentId: 49,
        subItems: [
          {
            id: 57,
            label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
            link: '/auth/signin/basic',
            parentId: 56
          },
          {
            id: 58,
            label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
            link: '/auth/signin/cover',
            parentId: 56
          },
        ]
      },
      {
        id: 59,
        label: 'MENUITEMS.AUTHENTICATION.LIST.SIGNUP',
        parentId: 49,
        subItems: [
          {
            id: 60,
            label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
            link: '/auth/signup/basic',
            parentId: 59
          },
          {
            id: 61,
            label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
            link: '/auth/signup/cover',
            parentId: 59
          },
        ]
      },
      {
        id: 62,
        label: 'MENUITEMS.AUTHENTICATION.LIST.PASSWORDRESET',
        parentId: 49,
        subItems: [
          {
            id: 63,
            label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
            link: '/auth/pass-reset/basic',
            parentId: 62
          },
          {
            id: 64,
            label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
            link: '/auth/pass-reset/cover',
            parentId: 62
          },
        ]
      },
      {
        id: 62,
        label: 'MENUITEMS.AUTHENTICATION.LIST.PASSWORDCREATE',
        parentId: 49,
        subItems: [
          {
            id: 63,
            label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
            link: '/auth/pass-create/basic',
            parentId: 62
          },
          {
            id: 64,
            label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
            link: '/auth/pass-create/cover',
            parentId: 62
          },
        ]
      },
      {
        id: 65,
        label: 'MENUITEMS.AUTHENTICATION.LIST.LOCKSCREEN',
        parentId: 49,
        subItems: [
          {
            id: 66,
            label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
            link: '/auth/lockscreen/basic',
            parentId: 65
          },
          {
            id: 67,
            label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
            link: '/auth/lockscreen/cover',
            parentId: 65
          },
        ]
      },
      {
        id: 68,
        label: 'MENUITEMS.AUTHENTICATION.LIST.LOGOUT',
        parentId: 49,
        subItems: [
          {
            id: 69,
            label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
            link: '/auth/logout/basic',
            parentId: 68
          },
          {
            id: 70,
            label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
            link: '/auth/logout/cover',
            parentId: 68
          },
        ]
      },
      {
        id: 71,
        label: 'MENUITEMS.AUTHENTICATION.LIST.SUCCESSMESSAGE',
        parentId: 49,
        subItems: [
          {
            id: 72,
            label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
            link: '/auth/success-msg/basic',
            parentId: 71
          },
          {
            id: 73,
            label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
            link: '/auth/success-msg/cover',
            parentId: 71
          },
        ]
      },
      {
        id: 74,
        label: 'MENUITEMS.AUTHENTICATION.LIST.TWOSTEPVERIFICATION',
        parentId: 49,
        subItems: [
          {
            id: 75,
            label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
            link: '/auth/twostep/basic',
            parentId: 74
          },
          {
            id: 76,
            label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
            link: '/auth/twostep/cover',
            parentId: 74
          },
        ]
      },
      {
        id: 77,
        label: 'MENUITEMS.AUTHENTICATION.LIST.ERRORS',
        parentId: 49,
        subItems: [
          {
            id: 78,
            label: 'MENUITEMS.AUTHENTICATION.LIST.404BASIC',
            link: '/auth/errors/404-basic',
            parentId: 77
          },
          {
            id: 79,
            label: 'MENUITEMS.AUTHENTICATION.LIST.404COVER',
            link: '/auth/errors/404-cover',
            parentId: 77
          },
          {
            id: 80,
            label: 'MENUITEMS.AUTHENTICATION.LIST.404ALT',
            link: '/auth/errors/404-alt',
            parentId: 77
          },
          {
            id: 81,
            label: 'MENUITEMS.AUTHENTICATION.LIST.500',
            link: '/auth/errors/page-500',
            parentId: 77
          },
          {
            id: 81,
            label: 'MENUITEMS.AUTHENTICATION.LIST.OFFLINE',
            link: '/auth/errors/offline',
            parentId: 77
          },
        ]
      },
    ]
  },
  {
    id: 96,
    label: 'MENUITEMS.COMPONENTS.TEXT',
    isTitle: true
  },
  {
    id: 121,
    label: 'MENUITEMS.ADVANCEUI.TEXT',
    icon: 'ri-stack-line',
    subItems: [
      {
        id: 122,
        label: 'MENUITEMS.ADVANCEUI.LIST.SWEETALERTS',
        link: 'advance-ui/sweetalerts',
        parentId: 121
      },
      {
        id: 124,
        label: 'MENUITEMS.ADVANCEUI.LIST.SCROLLBAR',
        link: 'advance-ui/scrollbar',
        parentId: 121
      },
      {
        id: 125,
        label: 'MENUITEMS.ADVANCEUI.LIST.ANIMATION',
        link: 'advance-ui/animation',
        parentId: 121
      },
      {
        id: 126,
        label: 'MENUITEMS.ADVANCEUI.LIST.TOUR',
        link: 'advance-ui/tour',
        parentId: 121
      },
      {
        id: 127,
        label: 'MENUITEMS.ADVANCEUI.LIST.SWIPERSLIDER',
        link: 'advance-ui/swiper',
        parentId: 121
      },
      {
        id: 128,
        label: 'MENUITEMS.ADVANCEUI.LIST.RATTINGS',
        link: 'advance-ui/ratings',
        parentId: 121
      },
      {
        id: 129,
        label: 'MENUITEMS.ADVANCEUI.LIST.HIGHLIGHT',
        link: 'advance-ui/highlight',
        parentId: 121
      },
      {
        id: 130,
        label: 'MENUITEMS.ADVANCEUI.LIST.SCROLLSPY',
        link: 'advance-ui/scrollspy',
        parentId: 121
      }
    ]
  },
  {
    id: 132,
    label: 'MENUITEMS.FORMS.TEXT',
    icon: 'ri-file-list-3-line',
    subItems: [
      {
        id: 133,
        label: 'MENUITEMS.FORMS.LIST.BASICELEMENTS',
        link: 'forms/basic',
        parentId: 132
      },
      {
        id: 134,
        label: 'MENUITEMS.FORMS.LIST.FORMSELECT',
        link: 'forms/select',
        parentId: 132
      },
      {
        id: 135,
        label: 'MENUITEMS.FORMS.LIST.CHECKBOXS&RADIOS',
        link: 'forms/checkboxs-radios',
        parentId: 132
      },
      {
        id: 136,
        label: 'MENUITEMS.FORMS.LIST.PICKERS',
        link: 'forms/pickers',
        parentId: 132
      },
      {
        id: 137,
        label: 'MENUITEMS.FORMS.LIST.INPUTMASKS',
        link: 'forms/masks',
        parentId: 132
      },
      {
        id: 138,
        label: 'MENUITEMS.FORMS.LIST.ADVANCED',
        link: 'forms/advanced',
        parentId: 132
      },
      {
        id: 139,
        label: 'MENUITEMS.FORMS.LIST.RANGESLIDER',
        link: 'forms/range-sliders',
        parentId: 132
      },
      {
        id: 140,
        label: 'MENUITEMS.FORMS.LIST.VALIDATION',
        link: 'forms/validation',
        parentId: 132
      },
      {
        id: 141,
        label: 'MENUITEMS.FORMS.LIST.WIZARD',
        link: 'forms/wizard',
        parentId: 132
      },
      {
        id: 142,
        label: 'MENUITEMS.FORMS.LIST.EDITORS',
        link: 'forms/editors',
        parentId: 132
      },
      {
        id: 143,
        label: 'MENUITEMS.FORMS.LIST.FILEUPLOADS',
        link: 'forms/file-uploads',
        parentId: 132
      },
      {
        id: 144,
        label: 'MENUITEMS.FORMS.LIST.FORMLAYOUTS',
        link: 'forms/layouts',
        parentId: 132
      }
    ]
  },
  {
    id: 169,
    label: 'MENUITEMS.ICONS.TEXT',
    icon: 'ri-compasses-2-line',
    subItems: [
      {
        id: 170,
        label: 'MENUITEMS.ICONS.LIST.REMIX',
        link: 'icons/remix',
        parentId: 169
      },
      {
        id: 171,
        label: 'MENUITEMS.ICONS.LIST.BOXICONS',
        link: 'icons/boxicons',
        parentId: 169
      },
      {
        id: 172,
        label: 'MENUITEMS.ICONS.LIST.MATERIALDESIGN',
        link: 'icons/materialdesign',
        parentId: 169
      },
      {
        id: 173,
        label: 'MENUITEMS.ICONS.LIST.LINEAWESOME',
        link: 'icons/lineawesome',
        parentId: 169
      },
      {
        id: 174,
        label: 'MENUITEMS.ICONS.LIST.FEATHER',
        link: 'icons/feather',
        parentId: 169
      },
      {
        id: 174,
        label: 'MENUITEMS.ICONS.LIST.CRYPTOSVG',
        link: 'icons/icons-crypto',
        parentId: 169,
      },
    ]
  }

];