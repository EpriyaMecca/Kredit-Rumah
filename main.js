function formatRupiah(angka) {
  var reverse = angka.toString().split("").reverse().join("");
  var ribuan = reverse.match(/\d{1,3}/g);
  var formatted = ribuan.join(".").split("").reverse().join("");
  return "Rp " + formatted;
}

function hitungKredit() {
  // Ambil nilai dari input
  var tipeRumah = document.getElementById("tipeRumah").value;
  var lamaCicilan = parseInt(document.getElementById("lamaCicilan").value);
  var periodeKredit = parseInt(document.getElementById("lamaCicilan").value);
  document.getElementById("periodeKredit").value = periodeKredit + " bulan";

  // Definisikan harga rumah berdasarkan tipe
  var hargaRumah;
  switch (tipeRumah) {
    case "tipe1":
      hargaRumah = 120000000;
      break;
    case "tipe2":
      hargaRumah = 130000000;
      break;
    default:
      hargaRumah = 0;
      break;
  }

  // Hitung uang muka (20% dari harga rumah)
  var uangMuka = hargaRumah * 0.2;

  // Hitung sisa cicilan
  var sisaCicilan = hargaRumah - uangMuka;

  // Hitung angsuran per bulan
  var angsuranPerBulan = sisaCicilan / lamaCicilan;

  // Objek yang mengaitkan tipe rumah dengan judul yang sesuai
  var judulTipeRumah = {
    tipe1: "Rumah Alamanda",
    tipe2: "Rumah Mawar",
  };

  // Tampilkan hasil dengan format Rupiah
  var hasilJudulTipeRumah = judulTipeRumah[tipeRumah];
  document.getElementById("hasilJudulTipeRumah").value = hasilJudulTipeRumah;
  document.getElementById("hasilHargaRumah").value = formatRupiah(hargaRumah);
  document.getElementById("hasilUangMuka").value = formatRupiah(uangMuka);
  document.getElementById("hasilSisaCicilan").value = formatRupiah(sisaCicilan);
  document.getElementById("angsuranBulan").value = formatRupiah(sisaCicilan / periodeKredit);

  // Buat tabel angsuran
  var tabelAngsuran = document.getElementById("tabelAngsuran");
  tabelAngsuran.innerHTML = ""; // Kosongkan tabel

  // Tambahkan <thead>
  var thead = document.createElement("thead");
  var row = document.createElement("tr");

  var thBulan = document.createElement("th");
  var thAngsuran = document.createElement("th");
  var thSisa = document.createElement("th");

  thBulan.textContent = "Bulan";
  thAngsuran.textContent = "Angsuran";
  thSisa.textContent = "Sisa";

  row.appendChild(thBulan);
  row.appendChild(thAngsuran);
  row.appendChild(thSisa);

  thead.appendChild(row);
  tabelAngsuran.appendChild(thead);

  for (var i = 1; i <= lamaCicilan; i++) {
    var totalAngsuran = angsuranPerBulan * i;
    var sisaAngsuran = sisaCicilan - totalAngsuran;

    var row = document.createElement("tr");
    var cellBulan = document.createElement("td");
    var cellTotalAngsuran = document.createElement("td");
    var cellSisaAngsuran = document.createElement("td");

    cellBulan.textContent = i;
    cellTotalAngsuran.textContent = formatRupiah(totalAngsuran.toFixed(0));
    cellSisaAngsuran.textContent = formatRupiah(sisaAngsuran.toFixed(0));

    row.appendChild(cellBulan);
    row.appendChild(cellTotalAngsuran);
    row.appendChild(cellSisaAngsuran);

    tabelAngsuran.appendChild(row);
  }

  // Tampilkan hasil setelah tombol diklik
  document.getElementById("hasil").style.display = "block";
}
