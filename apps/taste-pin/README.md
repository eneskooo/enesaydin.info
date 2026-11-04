# Taste Pin web

Taste Pin mobil uygulamasının Türkçe tanıtım sitesi. Yalnızca HTML, CSS ve vanilla JavaScript kullanır; framework, paket kurulumu veya derleme gerektirmez.

## Açma

`index.html` dosyasını doğrudan tarayıcıda açabilirsiniz. Yerel HTTP sunucusu için proje kökünden:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory apps/taste-pin
```

Ardından <http://127.0.0.1:4173> adresini açın. Statik bir sunucuya yayınlarken `apps/taste-pin/` içeriğini olduğu gibi kopyalayın; alt dizinde de çalışır.

## İçerik ve davranış

- Marka renkleri, Poppins 400/500/600 fontları ve görsel dil `../DESIGN.md` ile mobil temadan alınmıştır. Fontlar ve sincap görselleri yereldir; üçüncü taraf istek yapılmaz.
- Uygulama tanıtımı, üç adımlı kullanım açıklaması, filtrelenebilir liste/harita demosu, iOS paylaşım akışı ve sık sorulan sorular içerir.
- Telefon ekranı, mekânlar ve harita temsili önizlemelerdir; gerçek işletme bilgisi veya canlı harita sunmaz. Demo verileri yalnızca tarayıcı belleğinde tutulur, hesaba veya backend'e bağlanmaz.
- Ürün metni mevcut Instagram desteğini ve iOS'a özel paylaşım menüsünü anlatır. Doğrudan paylaşım Android için vaat edilmez.
- Doğrulanmış mağaza bağlantıları bulunmadığı için indirme düğmeleri yerine tanıtım bölümüne yönlenen bağlantılar kullanılır. Mağaza adresleri sağlandığında ilgili CTA'lar gerçek bağlantılara çevrilebilir.
- Küçük ekran menüsü, erişilebilir görünüm/filtre düğmeleri, klavye odağı, yerel `details` SSS öğeleri, azaltılmış hareket ve azaltılmış saydamlık tercihleri desteklenir. JavaScript olmadan tanıtım ve SSS okunabilir; etkileşimli demo JavaScript gerektirir.

`assets/fonts/Poppins-OFL.txt` font lisansını içerir. Uygulamanın mevcut görselleri `assets/app-icon.png` ve `assets/squirrel.png` olarak kopyalanmıştır.

## Doğrulama

Chrome’da 320, 375, 390, 680, 768, 850, 1024, 1280 ve 1440 piksel genişliklerde yatay taşma kontrol edildi. Filtreler, liste/harita geçişi, harita işaretçisi seçimi, mobil menü, Escape ile kapatma ve odağın menü düğmesine dönüşü, SSS ve azaltılmış hareket davranışı doğrulandı. Yerel görsel/font yüklemeleri ve sayfa içi bağlantılar kontrol edildi; JavaScript veya ağ hatası ve üçüncü taraf isteği görülmedi.

## Uygulama ekranı

Keşfet bölümündeki etkileşimli demo gerçek iOS harita ekranıyla değiştirildi. `assets/app-map-tr.png`, çalışan simülatörden alınan, değiştirilmemiş Türkçe ekran görüntüsüdür; bu oturumda kayıt bulunmadığı için boş durumu gösterir. İngilizce sayfada görselin Türkçe arayüz içerdiği belirtilir. Önceki demo testleri artık bu bölüm için geçerli değildir.

Keşfet bölümündeki ekran görüntüsü kullanıcı tercihiyle kaldırıldı; bölüm artık yalnızca açıklama ve özelliklerden oluşur.

## Gizlilik sayfası — 4 Kasım 2026

- `privacy.html`, mevcut TR/EN dil seçicisini ve yerel fontları kullanır. Türkçe metnin tamamı HTML içinde bulunur ve JavaScript kapalıyken okunabilir.
- İngilizce doğrudan giriş: `privacy.html?lang=en`. Geçerli `lang` parametresi kayıtlı tercihten önceliklidir; menüden dil değiştirme çalışmaya devam eder.
- Ana sayfa ve SSS alt bilgisinden erişilir. Mevcut alan adına dağıtıldıktan sonra hedef Privacy Policy URL: `https://enesaydin.info/apps/taste-pin/privacy.html`. Bu değişiklik kendi başına dağıtım veya App Store Connect güncellemesi yapmaz.
- İletişim metni kullanıcının istediği ifadeyi aynen kullanır: “For privacy questions, please use the developer contact details available on the platform where the app is published.” E-posta eklenmemiştir.

### Kaynak incelemesi ve sınırlar

İnceleme, kardeş `social-restaurant-finder` deposunun `mobile-app` kaynakları ve mobilin çağırdığı `backend/supabase` kodu/migrasyonları üzerinde yapıldı. Canlı Supabase yapılandırması, sağlayıcı sözleşmeleri, faturalandırma katmanları, yedek süreleri veya App Store Connect beyanları doğrulanmadı. Metin bir hukuk görüşü veya App Store kabul garantisi değildir.

| Konu | Kodda görülen davranış | Kaynak (`social-restaurant-finder/` altında) |
| --- | --- | --- |
| Kimlik | Misafir/hesap kimliği, e-posta, Apple/Google giriş, kurulum kimliği | `mobile-app/src/lib/auth.ts`, `src/lib/installation.ts`, `src/features/auth/native-sign-in.ts` (son iki yol mobile-app altında) |
| Analiz ve konum | İzinli enlem/boylam/zaman analiz isteğine eklenir; kaynak konumu yetersizse Google yer çözümlemesine aktarılabilir | `mobile-app/src/lib/api/{submit-analysis,analysis-location}.ts`; `backend/supabase/functions/_shared/contextual_intelligence.ts` |
| AI ve sosyal içerik | Gemini, Google Maps/Places, Instagram, YouTube; metin, profil ve mekân kanıtları | `backend/supabase/functions/_shared/{handlers,intelligence,contextual_intelligence,places,instagram,youtube,restaurant_insights}.ts` |
| Profil fotoğrafı | Seçilen görsel özel Supabase bucket'ına yüklenir; tüm arşive erişilmez | `mobile-app/src/features/profile/profile-photo.ts`; `backend/supabase/migrations/20261001200000_profile_photos.sql` |
| Bildirim | FCM/APNs, token, platform, dil, kurulum kimliği; izin sonrası kayıt | `mobile-app/src/features/notifications/client.ts`, `mobile-app/firebase.json` |
| Destek | Mesaj, kategori, dil, kullanıcı kimliği; ayrı reply_email alanı kaldırılmış | `mobile-app/src/features/support/support-screen.ts`; `backend/supabase/migrations/20261102190117_remove_support_reply_email.sql` |
| Teknik günlük | Filtrelenmiş içerikler; üç günlük grubu için günlük 30 gün temizliği | `backend/supabase/functions/_shared/diagnostics.ts`; `backend/supabase/migrations/20261015181224_provider_request_log_retention.sql`, `20261101135520_integration_diagnostics.sql` |
| Hesap silme | Güncel mobil akış `delete-account` üzerinden profil dosyalarını, Auth hesabını ve ilişkili kayıtları kalıcı siler | `mobile-app/src/features/profile/delete-account.ts`; `backend/supabase/functions/delete-account/handler.ts`; `backend/supabase/migrations/20261104190606_account_deletion_session_guard.sql` |
| Gizlilik bağlantısı | Mobil profil eylemi `undecided`, hedefi boş | `mobile-app/src/features/profile/actions.ts` |

### App Store başvurusu için durum ve kontroller

1. **Kalıcı hesap silme — güncellendi:** Kullanıcının bildirdiği düzeltme sonrasında güncel mobil çağrı, `delete-account` Edge Function ve `delete_my_account` migrasyonu incelendi. Yeni akış kalıcı silme yaptığı için politikanın Türkçe/İngilizce metnindeki eski devre dışı bırakma açıklaması kaldırıldı. Eski RPC geriye uyumluluk için kaynakta duruyor; güncel profil ekranı onu çağırmıyor. Bu sayfa güncellemesinde canlı dağıtım veya gerçek hesap üzerinde silme testi yapılmadı; tüm App Store şartları için kapsamlı uygunluk doğrulaması anlamına gelmez.
2. **AI paylaşım izni:** Analiz gönderiminden önce Google Gemini'ye giden verileri ve olası konum aktarımını açıklayan ayrı, açık izin akışı kaynakta bulunamadı. Ana uygulama, tekrar deneme, misafir kullanım ve iOS paylaşım uzantısı aynı izni uygulamalı. Politika sayfası ve sistem konum izni bunun yerine geçmez. Apple 5.1.2(i) esas alınmalı.
3. **Mobil bağlantı ve mağaza URL'si:** Profildeki gizlilik eylemini yayımlanmış HTTPS sayfasına bağla; App Store Connect Privacy Policy URL alanını doldur. Sayfanın giriş gerektirmeden erişildiğini yayın sonrasında doğrula. Bu iş kapsamında mobil kaynaklar değiştirilmedi.
4. **Veri sorumlusu ve iletişim:** Enes Aydın adı mevcut sitenin sahibi üzerinden kullanıldı; hukuki veri sorumlusu unvanı ayrıca doğrulanmalı. Kullanıcının istediği dolaylı iletişim cümlesi korundu. Mağazada gerçek ve erişilebilir bir geliştirici iletişim/başvuru kanalı bulunmalı; bunun KVKK/GDPR kimlik ve iletişim açıklamaları için yeterliliği hukukçu ile değerlendirilmeli. Sayfanın kendi kendisine dönen bir Support URL olması başvuru kanalı oluşturmaz.
5. **Saklama ve yurt dışı aktarım:** 30 gün yalnızca belirtilen günlük grupları içindir. Analizler, hassas konum bağlamı, misafir kayıtları, fotoğraflar, destek, Auth ve yedekler için gerekli süreler, silme mekanizmaları ve istisnalar netleştirilmeli. Supabase bölgesi, alt işleyenler, Google/Gemini hizmet katmanı ve veri kullanımı, sağlayıcı koruma/sözleşme koşulları, KVKK m.9 ve uygulanıyorsa GDPR aktarım mekanizmaları doğrulanmalı. İmzalanmış standart sözleşme, AB'de tutma veya AI eğitiminde kullanmama taahhüdü varsayılmadı.
6. **App Privacy beyanları:** “Data Not Collected” uygun görünmüyor. Ad/e-posta, kullanıcı kimliği, kurulum/push kimlikleri, hassas/yaklaşık konum, fotoğraf, diğer kullanıcı içeriği, müşteri desteği, kullanım ve tanılama kategorileri gerçek üretim davranışıyla eşleştirilmeli. Kullanıcı/misafir kimliğiyle bağlı kayıtlar anonim kabul edilmemeli. App Functionality ve tanılama amaçları; SDK'lar ve üretim sağlayıcılarıyla doğrulanmalı. Kaynak incelemesinde reklam/takip SDK'sı görülmemesi, tüm sağlayıcılar adına kesin takip beyanı değildir.

### Resmî dayanaklar

- [Apple App Review Guidelines 5.1.1 ve 5.1.2](https://developer.apple.com/app-store/review/guidelines/)
- [Apple: Offering account deletion in your app](https://developer.apple.com/help/app-review/guideline-reference/5-1-1-account-deletion/)
- [Apple App Privacy Details](https://developer.apple.com/app-store/app-privacy-details/)
- [KVKK: Aydınlatma yükümlülüğü](https://www.kvkk.gov.tr/Icerik/2033/Aydinlatma-Yukumlulugu-)
- [KVKK: Yurt dışına aktarım](https://www.kvkk.gov.tr/Icerik/2053/Yurtdisina-Aktarim)
- [KVKK: İlgili kişinin hakları](https://www.kvkk.gov.tr/Icerik/2036/Ilgili-Kisinin-Haklari)
- [KVKK: Başvuruların cevaplanması](https://www.kvkk.gov.tr/Icerik/2046/Ilgili-Kisiler-Tarafindan-Yapilan-Basvurularin-Cevaplanmasi-Yukumlulugu)
- [GDPR — özellikle m.6, 12–22, 44 vd.](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32016R0679)

### Bu değişikliğin doğrulaması

Chrome headless ile Türkçe ve İngilizce 320, 390, 768 ve 1280 px genişliklerde kontrol edildi: yatay taşma yok, 12 bölüm ve tüm bölüm bağlantıları mevcut, çeviri anahtarları eksiksiz. Dil değiştirme, başlık/OG dili, mobil menü, Escape ile kapatma ve odağın menü düğmesine dönüşü, ana sayfa/SSS gizlilik bağlantıları ve JavaScript kapalıyken metnin okunması doğrulandı. TR masaüstü ve EN mobil ekran görüntüleri görsel olarak incelendi. JavaScript istisnası veya başarısız kaynak isteği görülmedi. `node --check` ve `git diff --check` geçti. Bu kontroller canlı yayın, mobil uygulama veya hukuki uyumluluk doğrulaması değildir.
