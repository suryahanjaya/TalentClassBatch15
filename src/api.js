import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
   return res.send("Hello World!, ini adalah API Kelompok 5 LAGOS!");
});

// Fungsi untuk menghitung kecepatan
router.get("/kecepatan", (req, res) => {
   const {s, t} = req.query;
   if (!s || !t) {
      return res.status(400).json({"ERROR": "Parameter kosong / tidak lengkap"});
   } else {
      if (isNaN(s) || isNaN(t)) {
         return res.status(400).json({"ERROR": "Inputan/parameter harus berupa angka"});
      } else {
         
         const kecepatan = parseInt(s) / parseInt(t);
         return res.json({
            "kecepatan": "jarak(s) m / waktu(t) detik",
            "Hasil": `${kecepatan} m/s`
         });
      };
   };
});

//konversi manual dari rupiah ke dollar
const conversionRate = 0.000065; //1 rupiah = 0.000065 dollar

// API untuk konversi rupiah ke dollar
router.get("/rupiahToDollar", (req, res) => {
   const {rupiah} = req.query;
   if (!rupiah) {
      return res.status(400).json({"ERROR": "Tidak ada parameter yang diberikan"});
   } else {
      if (isNaN(rupiah)) {
         return res.status(400).json({"ERROR": "Inputan/parameter harus berupa angka"});
      } else {
         const dollar = parseInt(rupiah) * conversionRate;
         return res.json({
            "konversi": "rupiah -> dollar",
            "Hasil": `Rp.${rupiah} = $${dollar.toFixed(2)}`
         });
      };
   };
});

// API untuk konversi dollar ke rupiah
router.get("/dollarToRupiah", (req, res) => {
   const {dollar} = req.query;
   if (!dollar) {
      return res.status(400).json({"ERROR": "Tidak ada parameter yang diberikan"});
   } else{
      if (isNaN(dollar)) {
         return res.status(400).json({"ERROR": "Inputan/parameter harus berupa angka"});
      } else {
         const rupiah = parseInt(dollar) / conversionRate;
         return res.json({
            "konversi": "dollar -> rupiah",
            "Hasil": `$${dollar} = Rp.${rupiah.toFixed(2)}`
         });
      };
   };
});

// Fungsi untuk menentukan status berat badan
const getStatusBB = (bmi) => {
  if (bmi < 18.5) {
    return 'Berat badan kurang';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return 'Berat badan normal';
  } else {
    return 'Berat badan lebih';
  }
};

//API untuk menentukan status berat badan berdasarkan standar rumus broca dan BMI
router.get("/beratBadan", (req, res) => {
   const {gender, tinggi, berat} = req.query;
   if (!gender || !tinggi || !berat) {
      return res.status(400).json({"ERROR": "Parameter kosong / tidak lengkap"});
   } else {
      if (isNaN(tinggi) || isNaN(berat)) {
         return res.status(400).json({"ERROR": "berat & tinggi badan harus berupa angka"});
      } else {
         if (gender === "laki-laki") {
            const beratIdeal = parseInt(tinggi) - 100 - ((parseInt(tinggi) - 100) * 0.1);
            const heightInMeter = parseInt(tinggi) / 100;
            const BMI = parseInt(berat) / (heightInMeter * heightInMeter);
            const status = getStatusBB(BMI);
            return res.json({
               "Gender": "laki-laki",
               "Berat Badan Ideal": `${beratIdeal} kg`,
               "BMI": BMI,
               "Status": status
            });
         } else if (gender === "perempuan") {
            const beratIdeal = parseInt(tinggi) - 100 - ((parseInt(tinggi) - 100) * 0.15);
            const heightInMeter = parseInt(tinggi) / 100;
            const BMI = parseInt(berat) / (heightInMeter * heightInMeter);
            const status = getStatusBB(BMI);
            return res.json({
               "Gender": "perempuan",
               "Berat Badan Ideal": `${beratIdeal} kg`,
               "BMI": BMI,
               "Status": status
            });
         }
      }
   }
});

//API untuk menghitung umur
router.get("/umur", (req, res) => {
   const {thn, bln, tgl} = req.query;
   const tahunIni = new Date().getFullYear();
   if (!thn || !bln || !tgl) {
      return res.status(400).json({"ERROR": "Parameter kosong / tidak lengkap"});
   } else {
      if (isNaN(thn) || isNaN(bln) || isNaN(tgl)) {
         return res.status(400).json({"ERROR": "Inputan/parameter harus berupa angka"});
      } else {
         if (bln < 1 || bln > 12 || tgl < 1 || tgl > 31 || thn > tahunIni) {
            return res.status(400).json({"ERROR": "Inputan/parameter tidak valid"});
         } else {
            const today = new Date();
            const birthDate = new Date(thn, bln - 1, tgl);
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
               age--; 
            };
            return res.json({
               "Tanggal Lahir": `${thn}-${bln}-${tgl}`,
               "Umur": `${age} tahun`
            });
         }
      }
   }
});

//API untuk menghitung kalori
router.post('/calculate-calories', (req, res) => {
   //rumus mencari kalori harian
   const {name, gender, weight, height, age, activity } = req.body;

   //validate
   if (!name||!gender || !weight || !height || !age || !activity ) {
      return res.status(400).json({ message: 'All fields are required: name,gender, weight, height, age, activity' });
   }

   // activity average 1.2 - 1.9
   const activityValue = parseFloat(activity);
    if (isNaN(activityValue) || activityValue < 1.2 || activityValue > 1.9) {
        return res.status(400).json({ message: 'Activity must be a number between 1.2 and 1.9' });
    }

    const weightValue = parseInt(weight);
    const heightValue = parseInt(height);
    const ageValue = parseInt(age);
   let dailyCalories;
    if (gender === 'male') {
        dailyCalories = (66.5 + (13.75 * weightValue) + (5.003 * heightValue) - (6.75 * ageValue)) * activityValue;
    } else if (gender === 'female') {
        dailyCalories = (655.1 + (9.563 * weightValue) + (1.850 * heightValue) - (4.676 * ageValue)) * activityValue;
    } else {
        return res.status(400).json({ message: 'Invalid gender. Must be "male" or "female".' });
    }

    return res.json({name, dailyCalories: dailyCalories.toFixed(2)});
});

router.post('/kalkulasipinjaman', (req, res) => {
  const { jumlahPinjaman, bungaPertahun, jangkaWaktu } = req.body;

  // Validasi input
  if (jumlahPinjaman <= 0 || bungaPertahun <= 0 || jangkaWaktu <= 0) {
      return res.status(400).json({ error: 'Input values must be greater than zero' });
  }
  
  const bungaPerbulan = bungaPertahun / 100 / 12;
  const totalBulan = jangkaWaktu * 12;
  const biayaPerbulan = (jumlahPinjaman * bungaPerbulan) / (1 - Math.pow(1 + bungaPerbulan, -totalBulan));

  // Kirimkan hasil
  return res.json({
    jumlahPinjaman,
    bungaPertahun,
    jangkaWaktu,
    biayaPerbulan: biayaPerbulan.toFixed(2)
  });
});

export default router;

