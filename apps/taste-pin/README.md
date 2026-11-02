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
