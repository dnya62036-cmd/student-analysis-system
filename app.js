// 1. هيكلة بيانات الطالب (Class & Constructor)
class Student {
    constructor(id, name, grades, attendance) {
        this.id = id;                 // رقم الجلوس
        this.name = name;             // الاسم
        this.grades = grades;         // مصفوفة درجات 3 مواد
        this.attendance = attendance; // نسبة الحضور (%)
    }

    // 2. دوال التحليل الأكاديمي (Methods)
    
    // دالة حساب المتوسط باستخدام reduce
    calculateAverage() {
        const totalGrades = this.grades.reduce((accumulator, currentGrade) => accumulator + currentGrade, 0);
        return totalGrades / this.grades.length;
    }

    // دالة التقدير بالحروف المطلوبة من الدكتورة بناءً على المتوسط وقاعدة الشروط (if/else)
    getGradeLetter(average) {
        if (average >= 90) return 'A';
        else if (average >= 80) return 'B';
        else if (average >= 70) return 'C';
        else if (average >= 60) return 'D';
        else if (average >= 50) return 'E';
        else return 'F';
    }

    // دالة النتيجة النهائية بالتحقق من شرطين باستخدام (&&)
    getFinalResult() {
        const average = this.calculateAverage();
        if (average >= 50 && this.attendance >= 75) {
            return "ناجح";
        } else {
            return "يحتاج مراجعة";
        }
    }
}

// 3. نظام تشغيل الجامعة (Objects Array)
// أسماء وبيانات مجهزة بدقة متضمنة طلاب متعثرين (بين 40 و 49) لتفعيل لجنة الرأفة
const studentsList = [
    new Student(202601, "أحمد رأفت محمد السيد", [40, 45, 50], 82),  // متعثر (المتوسط: 45) -> رأفة
    new Student(202602, "دينا عبد الرحمن علي", [90, 95, 90], 96),   // متفوق (المتوسط: 91.66) -> تقدير A
    new Student(202603, "كريم تامر يوسف حسن", [45, 38, 43], 68),   // متعثر (المتوسط: 42) -> غياب
    new Student(202604, "منة الله عصام الدين", [70, 80, 75], 88)    // ناجح (المتوسط: 75) -> تقدير B
];

// 4. لجنة الرأفة (Array Methods)

// الاستخراج: استخدام filter لاستخراج الطلاب الذين تتراوح متوسطاتهم بين 40 و 49
const strugglingStudents = studentsList.filter(student => {
    const avg = student.calculateAverage();
    return avg >= 40 && avg <= 49;
});

// المعالجة: استخدام map لإضافة 5 درجات رأفة كدعم لمتوسط هؤلاء الطلاب
const graceAppliedStudents = strugglingStudents.map(student => {
    const originalAvg = student.calculateAverage();
    return {
        id: student.id,
        name: student.name,
        originalAverage: Number(originalAvg.toFixed(2)),
        newAverage: Number((originalAvg + 5).toFixed(2))
    };
});

// التحليل: استخدام reduce لجمع المتوسطات الجديدة بعد التعديل
const totalNewAverages = graceAppliedStudents.reduce((accumulator, student) => accumulator + student.newAverage, 0);

// متوسط الرأفة: حساب المتوسط العام مع إضافة "درع حماية" برمجياً لمنع القسمة على صفر
const generalGraceAverage = graceAppliedStudents.length > 0 ? (totalNewAverages / graceAppliedStudents.length) : 0;


// 5. المخرجات وتوليد التقارير في المتصفح بالألوان المطلوبة (بيبي بلو ونبيتي)

// العنوان الأول باللون النبيتي (Burgundy)
console.log("%c=== 1. تقرير جميع الطلاب في النظام (شامل التقديرات A-F) ===", "color: #800020; font-weight: bold; font-size: 14px;");
studentsList.forEach(student => {
    const avg = student.calculateAverage();
    console.log(
        `الرقم: ${student.id} | ` +
        `الاسم: ${student.name} | ` +
        `المتوسط: ${avg.toFixed(2)} | ` +
        `التقدير: ${student.getGradeLetter(avg)} | ` +
        `الحضور: ${student.attendance}% | ` +
        `النتيجة: ${student.getFinalResult()}`
    );
});

// العنوان الثاني باللون البيبي بلو (Baby Blue)
console.log("\n%c=== 2. مصفوفة الطلاب المتعثرين الذين شملتهم لجنة الرأفة ===", "color: #89CFF0; font-weight: bold; font-size: 14px;");
console.table(graceAppliedStudents);

// العنوان الثالث باللون النبيتي (Burgundy)
console.log("\n%c=== 3. متوسط درجات الطلاب المتعثرين بعد التعديل ===", "color: #800020; font-weight: bold; font-size: 14px;");
console.log(`المتوسط العام لطلاب الرأفة بعد الدعم: ${generalGraceAverage.toFixed(2)}`);