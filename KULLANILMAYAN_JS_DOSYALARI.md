# Kullanılmayan JavaScript Dosyaları Analizi

## Git Status'ta Silinen Sayfalara Göre Gereksiz JS Dosyaları

### 1. TABLES Klasörü Silinmiş
Git status'ta `src/app/pages/tables/` klasörü tamamen silinmiş:
- `basic` component
- `gridjs` component  
- `listjs` component

**İlgili JS Dosyaları (SİLİNEBİLİR):**
- ✅ `src/assets/js/pages/gridjs.init.js` - gridjs component'i için
- ✅ `src/assets/js/pages/listjs.init.js` - listjs component'i için
- ⚠️ `src/assets/js/pages/datatables.init.js` - Kontrol edilmeli, başka yerde kullanılıyor olabilir

### 2. UI Klasörü Silinmiş
Git status'ta `src/app/pages/ui/` klasörü tamamen silinmiş:
- accordions, alerts, badges, buttons, cards, carousel, colors, dropdowns, general, grid, images, links, list, media, modals, notifications, placeholder, progress, ribbons, tabs, typography, utilities, video

**İlgili JS Dosyaları:**
UI sayfalarına özel init dosyaları bulunmuyor, genel UI işlevleri `app.js` ve `layout.js` içinde.

### 3. Menu.ts'de Tanımlı Ama Routing'de Olmayan Sayfalar

Menu.ts dosyasında tanımlı ama routing modüllerinde bulunmayan sayfalar:

#### Charts Sayfaları (Menu'de var ama routing yok)
- `charts/apex-line` → `apexcharts-line.init.js` ✅ KULLANILMIYOR
- `charts/apex-area` → `apexcharts-area.init.js` ✅ KULLANILMIYOR
- `charts/apex-column` → `apexcharts-column.init.js` ✅ KULLANILMIYOR
- `charts/apex-bar` → `apexcharts-bar.init.js` ✅ KULLANILMIYOR
- `charts/apex-mixed` → `apexcharts-mixed.init.js` ✅ KULLANILMIYOR
- `charts/apex-timeline` → `apexcharts-timeline.init.js` ✅ KULLANILMIYOR
- `charts/apex-candlestick` → `apexcharts-candlestick.init.js` ✅ KULLANILMIYOR
- `charts/apex-boxplot` → `apexcharts-boxplot.init.js` ✅ KULLANILMIYOR
- `charts/apex-bubble` → `apexcharts-bubble.init.js` ✅ KULLANILMIYOR
- `charts/apex-scatter` → `apexcharts-scatter.init.js` ✅ KULLANILMIYOR
- `charts/apex-heatmap` → `apexcharts-heatmap.init.js` ✅ KULLANILMIYOR
- `charts/apex-treemap` → `apexcharts-treemap.init.js` ✅ KULLANILMIYOR
- `charts/apex-pie` → `apexcharts-pie.init.js` ✅ KULLANILMIYOR
- `charts/apex-radialbar` → `apexcharts-radialbar.init.js` ✅ KULLANILMIYOR
- `charts/apex-radar` → `apexcharts-radar.init.js` ✅ KULLANILMIYOR
- `charts/apex-polar` → `apexcharts-polararea.init.js` ✅ KULLANILMIYOR
- `charts/chartjs` → `chartjs.init.js` ✅ KULLANILMIYOR
- `charts/echarts` → `echarts.init.js` ✅ KULLANILMIYOR

#### Maps Sayfaları (Menu'de var ama routing yok)
- `maps/google` → `gmaps.init.js` ✅ KULLANILMIYOR
- `maps/leaflet` → `leaflet-map.init.js` ✅ KULLANILMIYOR

#### Apps Sayfaları (Bazıları menu'de var ama routing kontrol edilmeli)
- `apps/calendar` → `calendar.init.js` ⚠️ KONTROL EDİLMELİ
- `apps/chat` → `chat.init.js` ⚠️ KONTROL EDİLMELİ
- `apps/mailbox` → `mailbox.init.js` ⚠️ KONTROL EDİLMELİ
- `apps/file-manager` → `file-manager.init.js` ⚠️ KONTROL EDİLMELİ
- `apps/todo` → `todo.init.js` ⚠️ KONTROL EDİLMELİ
- `apps/projects` → `project-list.init.js`, `project-create.init.js`, `project-overview.init.js` ⚠️ KONTROL EDİLMELİ
- `apps/tasks` → `tasks-list.init.js`, `tasks-kanban.init.js` ⚠️ KONTROL EDİLMELİ
- `apps/ecommerce` → `ecommerce-*.init.js` dosyaları ⚠️ KULLANILIYOR (ecommerce routing var)
- `apps/crm` → `crm-*.init.js` dosyaları ⚠️ KONTROL EDİLMELİ
- `apps/crypto` → `crypto-*.init.js` dosyaları ⚠️ KONTROL EDİLMELİ
- `apps/invoices` → `invoiceslist.init.js`, `invoicecreate.init.js`, `invoicedetails.js` ⚠️ KONTROL EDİLMELİ
- `apps/support-tickets` → `ticketlist.init.js`, `ticketdetail.init.js` ⚠️ KONTROL EDİLMELİ
- `apps/nft` → `apps-nft-*.init.js` dosyaları ⚠️ KONTROL EDİLMELİ

#### Pages Sayfaları (Bazıları routing'de var)
- `pages/starter` → JS dosyası yok
- `pages/profile` → `profile.init.js` ✅ KULLANILIYOR (extrapages routing'de var)
- `pages/profile-setting` → `profile-setting.init.js` ✅ KULLANILIYOR (extrapages routing'de var)
- `pages/team` → `team.init.js` ✅ KULLANILIYOR (extrapages routing'de var)
- `pages/timeline` → `timeline.init.js` ✅ KULLANILIYOR (extrapages routing'de var)
- `pages/pricing` → `pricing.init.js` ✅ KULLANILIYOR (extrapages routing'de var)
- `pages/gallery` → `gallery.init.js` ✅ KULLANILIYOR (extrapages routing'de var)
- `pages/coming-soon` → `coming-soon.init.js` ✅ KULLANILIYOR (extrapages routing'de var)
- `pages/search-results` → `search-result.init.js` ✅ KULLANILIYOR (extrapages routing'de var)

## ÖZET: Kesinlikle Silinebilecek Dosyalar

### Tables Klasörü İçin (Git'te silinmiş):
1. ✅ `src/assets/js/pages/gridjs.init.js`
2. ✅ `src/assets/js/pages/listjs.init.js`

### Charts Sayfaları İçin (Menu'de var ama routing yok):
3. ✅ `src/assets/js/pages/apexcharts-line.init.js`
4. ✅ `src/assets/js/pages/apexcharts-area.init.js`
5. ✅ `src/assets/js/pages/apexcharts-column.init.js`
6. ✅ `src/assets/js/pages/apexcharts-bar.init.js`
7. ✅ `src/assets/js/pages/apexcharts-mixed.init.js`
8. ✅ `src/assets/js/pages/apexcharts-timeline.init.js`
9. ✅ `src/assets/js/pages/apexcharts-candlestick.init.js`
10. ✅ `src/assets/js/pages/apexcharts-boxplot.init.js`
11. ✅ `src/assets/js/pages/apexcharts-bubble.init.js`
12. ✅ `src/assets/js/pages/apexcharts-scatter.init.js`
13. ✅ `src/assets/js/pages/apexcharts-heatmap.init.js`
14. ✅ `src/assets/js/pages/apexcharts-treemap.init.js`
15. ✅ `src/assets/js/pages/apexcharts-pie.init.js`
16. ✅ `src/assets/js/pages/apexcharts-radialbar.init.js`
17. ✅ `src/assets/js/pages/apexcharts-radar.init.js`
18. ✅ `src/assets/js/pages/apexcharts-polararea.init.js`
19. ✅ `src/assets/js/pages/chartjs.init.js`
20. ✅ `src/assets/js/pages/echarts.init.js`

### Maps Sayfaları İçin (Menu'de var ama routing yok):
21. ✅ `src/assets/js/pages/gmaps.init.js`
22. ✅ `src/assets/js/pages/leaflet-map.init.js`

### Apps Sayfaları İçin (Apps routing boş, sadece widgets var):
23. ✅ `src/assets/js/pages/calendar.init.js`
24. ✅ `src/assets/js/pages/chat.init.js`
25. ✅ `src/assets/js/pages/mailbox.init.js`
26. ✅ `src/assets/js/pages/file-manager.init.js`
27. ✅ `src/assets/js/pages/todo.init.js`
28. ✅ `src/assets/js/pages/project-list.init.js`
29. ✅ `src/assets/js/pages/project-create.init.js`
30. ✅ `src/assets/js/pages/project-overview.init.js`
31. ✅ `src/assets/js/pages/tasks-list.init.js`
32. ✅ `src/assets/js/pages/tasks-kanban.init.js`
33. ✅ `src/assets/js/pages/crm-companies.init.js`
34. ✅ `src/assets/js/pages/crm-contact.init.js`
35. ✅ `src/assets/js/pages/crm-deals.init.js`
36. ✅ `src/assets/js/pages/crm-leads.init.js`
37. ✅ `src/assets/js/pages/crypto-buy-sell.init.js`
38. ✅ `src/assets/js/pages/crypto-kyc.init.js`
39. ✅ `src/assets/js/pages/crypto-orders.init.js`
40. ✅ `src/assets/js/pages/crypto-transactions.init.js`
41. ✅ `src/assets/js/pages/crypto-wallet.init.js`
42. ✅ `src/assets/js/pages/invoiceslist.init.js`
43. ✅ `src/assets/js/pages/invoicecreate.init.js`
44. ✅ `src/assets/js/pages/invoicedetails.js`
45. ✅ `src/assets/js/pages/ticketlist.init.js`
46. ✅ `src/assets/js/pages/ticketdetail.init.js`
47. ✅ `src/assets/js/pages/apps-nft-auction.init.js`
48. ✅ `src/assets/js/pages/apps-nft-create.init.js`
49. ✅ `src/assets/js/pages/apps-nft-explore.init.js`
50. ✅ `src/assets/js/pages/apps-nft-item-details.init.js`
51. ✅ `src/assets/js/pages/apps-nft-ranking.init.js`

### Dashboards Sayfaları İçin (Dashboards routing boş, sadece ana dashboard var):
52. ✅ `src/assets/js/pages/dashboard-analytics.init.js`
53. ✅ `src/assets/js/pages/dashboard-crm.init.js`
54. ✅ `src/assets/js/pages/dashboard-crypto.init.js`
55. ✅ `src/assets/js/pages/dashboard-ecommerce.init.js`
56. ✅ `src/assets/js/pages/dashboard-job.init.js`
57. ✅ `src/assets/js/pages/dashboard-nft.init.js`
58. ✅ `src/assets/js/pages/dashboard-projects.init.js`

### Diğer Kullanılmayan Dosyalar:
59. ✅ `src/assets/js/pages/job-application.init.js` (Job sayfaları routing'de yok)
60. ✅ `src/assets/js/pages/job-candidate-grid.init.js`
61. ✅ `src/assets/js/pages/job-candidate-lists.init.js`
62. ✅ `src/assets/js/pages/job-companies-lists.init.js`
63. ✅ `src/assets/js/pages/job-grid-list.init.js`
64. ✅ `src/assets/js/pages/job-lading.init.js`
65. ✅ `src/assets/js/pages/job-list.init.js`
66. ✅ `src/assets/js/pages/job-statistics.init.js`
67. ✅ `src/assets/js/pages/sellers.init.js`
68. ✅ `src/assets/js/pages/seller-details.init.js`
69. ✅ `src/assets/js/pages/api-key.init.js`
70. ✅ `src/assets/js/pages/notifications.init.js` (UI klasörü silinmiş)
71. ✅ `src/assets/js/pages/modal.init.js` (UI klasörü silinmiş)
72. ✅ `src/assets/js/pages/card.init.js` (UI klasörü silinmiş)
73. ✅ `src/assets/js/pages/nestable.init.js`
74. ✅ `src/assets/js/pages/vector-maps.init.js`
76. ✅ `src/assets/js/pages/leaflet-us-states.js`
77. ✅ `src/assets/js/pages/particles.app.js`
78. ✅ `src/assets/js/pages/animation-aos.init.js`
79. ✅ `src/assets/js/pages/remix-icons-listing.js`
80. ✅ `src/assets/js/pages/materialdesign.list.js`

**TOPLAM: 80 dosya kesinlikle silinebilir**

## Kullanılan Dosyalar (SİLİNMEYECEK)

Aşağıdaki dosyalar routing'de mevcut ve kullanılıyor:

### Forms (Form routing'de var):
- ✅ `form-advanced.init.js` - forms/advanced
- ✅ `form-editor.init.js` - forms/editors
- ✅ `form-file-upload.init.js` - forms/file-uploads
- ✅ `form-input-spin.init.js` - forms/input-spin
- ✅ `form-masks.init.js` - forms/masks
- ✅ `form-pickers.init.js` - forms/pickers
- ✅ `form-validation.init.js` - forms/validation
- ✅ `form-wizard.init.js` - forms/wizard
- ✅ `select2.init.js` - forms/select
- ✅ `range-sliders.init.js` - forms/range-sliders
- ✅ `flag-input.init.js` - forms/flag-input

### Advance UI (Advance-ui routing'de var):
- ✅ `sweetalerts.init.js` - advance-ui/sweetalerts
- ✅ `swiper.init.js` - advance-ui/swiper
- ✅ `tour.init.js` - advance-ui/tour
- ✅ `rating.init.js` - advance-ui/ratings için kullanılıyor

### Extra Pages (Extrapages routing'de var):
- ✅ `profile.init.js` - pages/profile
- ✅ `profile-setting.init.js` - pages/profile-setting
- ✅ `team.init.js` - pages/team
- ✅ `timeline.init.js` - pages/timeline
- ✅ `pricing.init.js` - pages/pricing
- ✅ `gallery.init.js` - pages/gallery
- ✅ `coming-soon.init.js` - pages/coming-soon
- ✅ `search-result.init.js` - pages/search-results

### Ecommerce (Ecommerce routing'de var):
- ✅ `ecommerce-product-list.init.js`
- ✅ `ecommerce-product-create.init.js`
- ✅ `ecommerce-product-details.init.js`
- ✅ `ecommerce-product-checkout.init.js`
- ✅ `ecommerce-customer-list.init.js`
- ✅ `ecommerce-order.init.js`
- ✅ `ecommerce-cart.init.js`

### Landing Pages:
- ✅ `landing.init.js` - landing sayfası için
- ✅ `nft-landing.init.js` - landing/nft için
- ✅ `job-lading.init.js` - landing/job için (kontrol edilmeli)

### Widgets:
- ✅ `widgets.init.js` - apps/widgets için

### Diğer:
- ✅ `datatables.init.js` - Ecommerce sayfalarında kullanılıyor (product-list, order-list, vb.)
