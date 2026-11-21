# swaddly-web

Swaddly'nin herkese açık sayfaları, GitHub Pages ile yayınlanır:
`https://mericerkosun.github.io/swaddly-web/`.

| Sayfa | Ne için |
|---|---|
| `support/` | Destek, kötüye kullanım bildirimi, satın alma ve iade |
| `delete-account/` | Web'den hesap silme (Play Data Safety formundaki bağlantı) |
| `terms/` | Kullanım koşulları (İngilizce ve Türkçe): krediler, kurallar, AI sonucu, askı, sorumluluk, uygulanacak hukuk |
| `privacy/` | Gizlilik politikası (İngilizce ve Türkçe, herkes için tek metin); sonunda KVKK aydınlatma metni ve Kore (PIPA), Japonya (APPI) için kısa notlar (uygulama, Play ve Google onay ekranı bağlantısı) |

Destek, hesap silme ve ana sayfada İngilizce, Türkçe, Japonca ve Korece; gizlilik
politikasında yalnızca İngilizce ve Türkçe birlikte durur (`<html data-langs>`); `assets/lang.js`
adresteki `#en` / `#tr` / `#ja` / `#ko`'ya (uygulama böyle açar), yoksa
tarayıcının diline göre birini gösterir; sayfada o dil yoksa İngilizce. Hiçbir şey saklanmaz.

Düz HTML ve CSS; derleme yok. Renkler uygulama deposundaki `DESIGN.md` ile
aynı. Yazı tipi dışarıdan yüklenmez.

**Bu repo herkese açık.** Yalnızca yayımlanacak metinler girer: gizli
değer, test hesabı, iç not girmez. Uygulama ve sunucu kodu gizli `swaddly`
reposundadır.
