export const state = () => ({
    stepper: 1,
    lastStudentRegistered: null,
    orderTitels: [
        {
            "idOrderTitle": 1,
            "title": "استضافة الى كليتنا",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 2,
            "title": "استضافة من كليتنا",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 3,
            "title": "اعتماد اسماء فصل اول",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 4,
            "title": "اعتماد اسماء فصل ثاني",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 5,
            "title": "اعفاء من القسط",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 6,
            "title": "اعفاء من مواد",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 7,
            "title": "الطلبة الاوائل",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 8,
            "title": "الغاء امر",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 9,
            "title": "الغاء امر تزوير",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 10,
            "title": "الغاء رسوب",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 11,
            "title": "الغاء قبول",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 12,
            "title": "الغاء قبول مزور",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 13,
            "title": "امتحان %100",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 14,
            "title": "امر اداري",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 15,
            "title": "بيان رأي",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 16,
            "title": "تأجيل",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 17,
            "title": "تأجيل تخرج",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 18,
            "title": "تحميل مواد",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 19,
            "title": "تحميل مواد (نقل)",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 20,
            "title": "تحويل دراسة",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 21,
            "title": "تخرج طلبة",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 22,
            "title": "تخرج طلبة دور اول",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 23,
            "title": "تخرج طلبة دور ثاني",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 24,
            "title": "ترقين قيد",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 25,
            "title": "ترقين قيد بناءا على طلبه",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 26,
            "title": "تصويب اسم",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 27,
            "title": "تغيير تسمية قسم",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 28,
            "title": "تغيير قسم",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 29,
            "title": "توزيع طلبة على الفروع",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 30,
            "title": "درجات طالب",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 31,
            "title": "رسوب بالغش",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 32,
            "title": "رسوب بالغياب",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 33,
            "title": "رسوب بالمواد",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 34,
            "title": "رسوب بمواد العبور",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 35,
            "title": "رسوب ماده واحده",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 36,
            "title": "رفع نسبة غياب",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 37,
            "title": "سنة عدم رسوب",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 38,
            "title": "سيرة دراسية",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 39,
            "title": "صادر خارجي",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 40,
            "title": "صحة صدور خريج",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 41,
            "title": "صحة صدور وثيقة",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 42,
            "title": "طي قيد",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 43,
            "title": "عدم ممانعة",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 44,
            "title": "عقوبة",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 45,
            "title": "عودة الى الدراسة",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 46,
            "title": "غرامه و خصم",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 47,
            "title": "قبول",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 48,
            "title": "قبول المنحة المجانية",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 49,
            "title": "قبول نصف المنحة",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 50,
            "title": "مقاصة علمية",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 51,
            "title": "مناهج دراسية",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 52,
            "title": "نجاح دور اول",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 53,
            "title": "نجاح دور تكميلي",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 54,
            "title": "نجاح دور ثاني",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 55,
            "title": "نقل الى كليتنا",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 56,
            "title": "نقل من كليتنا",
            "createdAt": "2021-11-27T11:19:31.181Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 57,
            "title": "لايوجد",
            "createdAt": "2021-11-28T12:04:48.000Z",
            "createdBy": 1
        }/* ,
        {
            "idOrderTitle": 446,
            "title": "تحويل من نظام سنوي الى فصلي",
            "createdAt": "2021-12-13T20:19:40.000Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 447,
            "title": "تخرج طلبة دور تكميلي",
            "createdAt": "2021-12-13T20:20:28.000Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 448,
            "title": "تغيير فرع",
            "createdAt": "2021-12-13T20:20:54.000Z",
            "createdBy": 1
        },
        {
            "idOrderTitle": 449,
            "title": "توزيع تأهيلي",
            "createdAt": "2021-12-13T20:21:26.000Z",
            "createdBy": 1
        } */
    ],

    sections: [
        {
            "idSection": 14,
            "sectionName": "ادارة الاعمال",
            "code": "02",
            "englishName": "none"
        },
        {
            "idSection": 15,
            "sectionName": "الاعلام - العلاقات العامة",
            "code": "07",
            "englishName": "none"
        },
        {
            "idSection": 16,
            "sectionName": "الاولى",
            "code": "",
            "englishName": "none"
        },
        {
            "idSection": 21,
            "sectionName": "العلوم المالية و المصرفية",
            "code": "03",
            "englishName": "none"
        },
        {
            "idSection": 22,
            "sectionName": "القانون",
            "code": "08",
            "englishName": "none"
        },
        {
            "idSection": 23,
            "sectionName": "اللغة العربية",
            "code": "12",
            "englishName": "none"
        },
        {
            "idSection": 24,
            "sectionName": "الهندسة المدنية",
            "code": "13",
            "englishName": "none"
        },
        {
            "idSection": 25,
            "sectionName": "تأهيلي",
            "code": "",
            "englishName": "none"
        },
        {
            "idSection": 26,
            "sectionName": "تقنيات البصريات",
            "code": "06",
            "englishName": "none"
        },
        {
            "idSection": 27,
            "sectionName": "تقنيات التحليلات المرضية",
            "code": "11",
            "englishName": "none"
        },
        {
            "idSection": 28,
            "sectionName": "تقنيات المختبرات الطبية",
            "code": "15",
            "englishName": "none"
        },
        {
            "idSection": 29,
            "sectionName": "تقنيات صناعة الاسنان",
            "code": "14",
            "englishName": "none"
        },
        {
            "idSection": 30,
            "sectionName": "طب الاسنان",
            "code": "09",
            "englishName": "none"
        },
        {
            "idSection": 31,
            "sectionName": "علوم الحاسوب",
            "code": "01",
            "englishName": "none"
        },
        {
            "idSection": 32,
            "sectionName": "فرع الادارة الصناعية",
            "code": "02",
            "englishName": "none"
        },
        {
            "idSection": 37,
            "sectionName": "هندسة البناء والانشاءات",
            "code": "10",
            "englishName": "none"
        },
        {
            "idSection": 38,
            "sectionName": "هندسة تقنيات التبريد والتكييف",
            "code": "05",
            "englishName": "none"
        },
        {
            "idSection": 39,
            "sectionName": "هندسة تقنيات الحاسوب",
            "code": "04",
            "englishName": "none"
        },
        {
            "idSection": 40,
            "sectionName": "الاعلام - الصحافة الاذاعية والتلفزيونية",
            "code": "07",
            "englishName": "none"
        },
        {
            "idSection": 41,
            "sectionName": "هندسة تقنيات الاجهزة الطبية",
            "code": "16",
            "englishName": "none"
        },
        {
            "idSection": 42,
            "sectionName": "اداب اللغة الانجليزية",
            "code": "17",
            "englishName": "none"
        },
        {
            "idSection": 43,
            "sectionName": "محاسبة",
            "code": "18",
            "englishName": "none"
        },
        {
            "idSection": 44,
            "sectionName": "قسم تجريبي",
            "code": "0555",
            "englishName": "none"
        },
        {
            "idSection": 45,
            "sectionName": "تقنيات التخدير",
            "code": "19",
            "englishName": "ans"
        },
        {
            "idSection": 46,
            "sectionName": "تقنيات الاشعة",
            "code": "20",
            "englishName": "rad"
        }
    ],

    yearStudies: [
        {
            "idYearStudy": 1,
            "year": "2020-2021",
            "currentYear": false
        },
        {
            "idYearStudy": 2,
            "year": "2019-2020",
            "currentYear": false
        },
        {
            "idYearStudy": 3,
            "year": "2018-2019",
            "currentYear": false
        },
        {
            "idYearStudy": 4,
            "year": "2017-2018",
            "currentYear": false
        },
        {
            "idYearStudy": 5,
            "year": "2016-2017",
            "currentYear": false
        },
        {
            "idYearStudy": 6,
            "year": "2015-2016",
            "currentYear": false
        },
        {
            "idYearStudy": 7,
            "year": "2014-2015",
            "currentYear": false
        },
        {
            "idYearStudy": 8,
            "year": "2013-2014",
            "currentYear": false
        },
        {
            "idYearStudy": 9,
            "year": "2012-2013",
            "currentYear": false
        },
        {
            "idYearStudy": 10,
            "year": "2011-2012",
            "currentYear": false
        },
        {
            "idYearStudy": 11,
            "year": "2010-2011",
            "currentYear": false
        },
        {
            "idYearStudy": 12,
            "year": "2009-2010",
            "currentYear": false
        },
        {
            "idYearStudy": 13,
            "year": "2008-2009",
            "currentYear": false
        },
        {
            "idYearStudy": 14,
            "year": "2007-2008",
            "currentYear": false
        },
        {
            "idYearStudy": 15,
            "year": "2006-2007",
            "currentYear": false
        },
        {
            "idYearStudy": 16,
            "year": "2005-2006",
            "currentYear": false
        },
        {
            "idYearStudy": 17,
            "year": "2004-2005",
            "currentYear": false
        },
        {
            "idYearStudy": 18,
            "year": "لايوجد",
            "currentYear": false
        },
        {
            "idYearStudy": 19,
            "year": "2021-2022",
            "currentYear": true
        },
        {
            "idYearStudy": 20,
            "year": "2003-2004",
            "currentYear": false
        },
        {
            "idYearStudy": 21,
            "year": "2002-2003",
            "currentYear": false
        },
        {
            "idYearStudy": 22,
            "year": "2001-2002",
            "currentYear": false
        },
        {
            "idYearStudy": 23,
            "year": "2000-2001",
            "currentYear": false
        },
        {
            "idYearStudy": 24,
            "year": "1999-2000",
            "currentYear": false
        },
        {
            "idYearStudy": 25,
            "year": "1998-1999",
            "currentYear": false
        },
        {
            "idYearStudy": 26,
            "year": "1997-1998",
            "currentYear": false
        },
        {
            "idYearStudy": 27,
            "year": "1996-1997",
            "currentYear": false
        },
        {
            "idYearStudy": 28,
            "year": "1995-1996",
            "currentYear": false
        },
        {
            "idYearStudy": 29,
            "year": "1994-1995",
            "currentYear": false
        },
        {
            "idYearStudy": 30,
            "year": "1993-1994",
            "currentYear": false
        },
        {
            "idYearStudy": 31,
            "year": "1992-1993",
            "currentYear": false
        },
        {
            "idYearStudy": 32,
            "year": "1991-1992",
            "currentYear": false
        },
        {
            "idYearStudy": 33,
            "year": "1990-1991",
            "currentYear": false
        },
        {
            "idYearStudy": 34,
            "year": "1989-1990",
            "currentYear": false
        },
        {
            "idYearStudy": 35,
            "year": "1988-1989",
            "currentYear": false
        },
        {
            "idYearStudy": 36,
            "year": "1987-1988",
            "currentYear": false
        },
        {
            "idYearStudy": 37,
            "year": "1986-1987",
            "currentYear": false
        },
        {
            "idYearStudy": 38,
            "year": "1985-1986",
            "currentYear": false
        },
        {
            "idYearStudy": 39,
            "year": "1984-1985",
            "currentYear": false
        },
        {
            "idYearStudy": 40,
            "year": "1983-1984",
            "currentYear": false
        },
        {
            "idYearStudy": 41,
            "year": "1982-1983",
            "currentYear": false
        },
        {
            "idYearStudy": 42,
            "year": "1981-1982",
            "currentYear": false
        },
        {
            "idYearStudy": 43,
            "year": "1980-1981",
            "currentYear": false
        },
        {
            "idYearStudy": 44,
            "year": "2021-2022",
            "currentYear": false
        }
    ],

    studentsStatus: [
        {
            "idStudentStatus": 1,
            "statusName": "مستمر"
        },
        {
            "idStudentStatus": 2,
            "statusName": "محجوب"
        },
        {
            "idStudentStatus": 3,
            "statusName": "متخرج"
        },
        {
            "idStudentStatus": 4,
            "statusName": "طالب جديد"
        },
        {
            "idStudentStatus": 5,
            "statusName": "خروج بامر اداري"
        }
    ],

    acceptedTypes: [
        {
            "idAcceptedType": 1,
            "acceptedName": "القناة العامة"
        },
        {
            "idAcceptedType": 2,
            "acceptedName": "قناة ذوي الشهداء"
        },
        {
            "idAcceptedType": 3,
            "acceptedName": "قناة ابناء التدريسيين وحملة الشهادات العليا"
        },
        {
            "idAcceptedType": 4,
            "acceptedName": "قناة الاعلاميين"
        },
        {
            "idAcceptedType": 5,
            "acceptedName": "مفوض الشرطة"
        },
        {
            "idAcceptedType": 6,
            "acceptedName": "المنحة المجانية"
        },
        {
            "idAcceptedType": 7,
            "acceptedName": "المنحة النصف مجانية"
        },
        {
            "idAcceptedType": 8,
            "acceptedName": "قبول مباشر"
        }
    ],

    studyCategories: [
        {
            "idStudyCategory": 1,
            "categoryName": "علمي",
            "StudySubCategory": [
                {
                    "idStudySubCategory": 58,
                    "subCategoryName": "احيائي",
                    "studyCategoryId": 1
                },
                {
                    "idStudySubCategory": 59,
                    "subCategoryName": "علمي",
                    "studyCategoryId": 1
                },
                {
                    "idStudySubCategory": 86,
                    "subCategoryName": "تطبيقي",
                    "studyCategoryId": 1
                }
            ]
        },
        {
            "idStudyCategory": 2,
            "categoryName": "ادبي",
            "StudySubCategory": [
                {
                    "idStudySubCategory": 57,
                    "subCategoryName": "ادبي",
                    "studyCategoryId": 2
                }
            ]
        },
        {
            "idStudyCategory": 3,
            "categoryName": "تجاري",
            "StudySubCategory": [
                {
                    "idStudySubCategory": 60,
                    "subCategoryName": "الادارة",
                    "studyCategoryId": 3
                },
                {
                    "idStudySubCategory": 61,
                    "subCategoryName": "الاقتصاد",
                    "studyCategoryId": 3
                },
                {
                    "idStudySubCategory": 62,
                    "subCategoryName": "المحاسبة",
                    "studyCategoryId": 3
                },
                {
                    "idStudySubCategory": 63,
                    "subCategoryName": "ادارة المخازن",
                    "studyCategoryId": 3
                },
                {
                    "idStudySubCategory": 64,
                    "subCategoryName": "عام",
                    "studyCategoryId": 3
                }
            ]
        },
        {
            "idStudyCategory": 4,
            "categoryName": "صناعي",
            "StudySubCategory": [
                {
                    "idStudySubCategory": 65,
                    "subCategoryName": "الالكترونيك وسيطرة",
                    "studyCategoryId": 4
                },
                {
                    "idStudySubCategory": 66,
                    "subCategoryName": "الاتصالات",
                    "studyCategoryId": 4
                },
                {
                    "idStudySubCategory": 67,
                    "subCategoryName": "صيانة الحاسبات",
                    "studyCategoryId": 4
                },
                {
                    "idStudySubCategory": 68,
                    "subCategoryName": "الاجهزة الطبية",
                    "studyCategoryId": 4
                },
                {
                    "idStudySubCategory": 69,
                    "subCategoryName": "انتاج ميكانيك",
                    "studyCategoryId": 4
                },
                {
                    "idStudySubCategory": 70,
                    "subCategoryName": "نجارة",
                    "studyCategoryId": 4
                },
                {
                    "idStudySubCategory": 71,
                    "subCategoryName": "تكييف الهواء والتثليج",
                    "studyCategoryId": 4
                },
                {
                    "idStudySubCategory": 72,
                    "subCategoryName": "شبكات الحاسوب",
                    "studyCategoryId": 4
                },
                {
                    "idStudySubCategory": 72,
                    "subCategoryName": "شبكات الحاسوب",
                    "studyCategoryId": 4
                },
                {
                    "idStudySubCategory": 73,
                    "subCategoryName": "تشغيل صيانة ميكانيكية",
                    "studyCategoryId": 4
                },
                {
                    "idStudySubCategory": 74,
                    "subCategoryName": "انتاج تصنيع معادن",
                    "studyCategoryId": 4
                },
                {
                    "idStudySubCategory": 75,
                    "subCategoryName": "السيارات",
                    "studyCategoryId": 4
                },
                {
                    "idStudySubCategory": 76,
                    "subCategoryName": "مكائن ومعدات",
                    "studyCategoryId": 4
                },
                {
                    "idStudySubCategory": 77,
                    "subCategoryName": "خريجي مراكز التدريب المهني",
                    "studyCategoryId": 4
                },
                {
                    "idStudySubCategory": 87,
                    "subCategoryName": "الكهرباء",
                    "studyCategoryId": 4
                },
                {
                    "idStudySubCategory": 88,
                    "subCategoryName": "القدرة الكهربائي",
                    "studyCategoryId": 4
                },
                {
                    "idStudySubCategory": 89,
                    "subCategoryName": "تكنلوجيا الاعلام",
                    "studyCategoryId": 4
                },
                {
                    "idStudySubCategory": 90,
                    "subCategoryName": "الحاسبات",
                    "studyCategoryId": 4
                },
                {
                    "idStudySubCategory": 91,
                    "subCategoryName": "ميكاترونكس سيارات",
                    "studyCategoryId": 4
                },
                {
                    "idStudySubCategory": 92,
                    "subCategoryName": "تكنلوجيا صناعية",
                    "studyCategoryId": 4
                },
                {
                    "idStudySubCategory": 93,
                    "subCategoryName": "لحام غازي و كهربائي",
                    "studyCategoryId": 4
                },
                {
                    "idStudySubCategory": 94,
                    "subCategoryName": "تبريد و تكيف",
                    "studyCategoryId": 4
                },
                {
                    "idStudySubCategory": 95,
                    "subCategoryName": "طباعة",
                    "studyCategoryId": 4
                },
                {
                    "idStudySubCategory": 96,
                    "subCategoryName": "سباكة",
                    "studyCategoryId": 4
                },
                {
                    "idStudySubCategory": 97,
                    "subCategoryName": "غزل و نسيج",
                    "studyCategoryId": 4
                },
                {
                    "idStudySubCategory": 98,
                    "subCategoryName": "مضخات و توربينات",
                    "studyCategoryId": 4
                },
                {
                    "idStudySubCategory": 99,
                    "subCategoryName": "انتاج",
                    "studyCategoryId": 4
                },
                {
                    "idStudySubCategory": 100,
                    "subCategoryName": "ميكانيك",
                    "studyCategoryId": 4
                },
                {
                    "idStudySubCategory": 101,
                    "subCategoryName": "محطات و شبكات و معالجة المياه",
                    "studyCategoryId": 4
                },
                {
                    "idStudySubCategory": 102,
                    "subCategoryName": "مكننة زراعية",
                    "studyCategoryId": 4
                }
            ]
        },
        {
            "idStudyCategory": 5,
            "categoryName": "الحاسوب وتقنية المعلومات",
            "StudySubCategory": [
                {
                    "idStudySubCategory": 78,
                    "subCategoryName": "تجميع وصيانة الحاسوب",
                    "studyCategoryId": 5
                },
                {
                    "idStudySubCategory": 79,
                    "subCategoryName": "اجهزة الهاتف والحاسوب المحمول",
                    "studyCategoryId": 5
                },
                {
                    "idStudySubCategory": 80,
                    "subCategoryName": "الادارة الالكترونية",
                    "studyCategoryId": 5
                },
                {
                    "idStudySubCategory": 104,
                    "subCategoryName": "شبكات الحاسوب",
                    "studyCategoryId": 5
                }
            ]
        },
        {
            "idStudyCategory": 6,
            "categoryName": "معهد المعلمين",
            "StudySubCategory": [
                {
                    "idStudySubCategory": 81,
                    "subCategoryName": "اللغة العربية",
                    "studyCategoryId": 6
                }
            ]
        },
        {
            "idStudyCategory": 7,
            "categoryName": "فنون تطبيقية",
            "StudySubCategory": [
                {
                    "idStudySubCategory": 82,
                    "subCategoryName": "فنون تطبيقية",
                    "studyCategoryId": 7
                },
                {
                    "idStudySubCategory": 103,
                    "subCategoryName": "الاسرية",
                    "studyCategoryId": 7
                }
            ]
        },
        {
            "idStudyCategory": 8,
            "categoryName": "فنون جميلة",
            "StudySubCategory": [
                {
                    "idStudySubCategory": 83,
                    "subCategoryName": "فنون جميلة",
                    "studyCategoryId": 8
                }
            ]
        },
        {
            "idStudyCategory": 9,
            "categoryName": "ادبي - معهد مفوضي شرطة",
            "StudySubCategory": [
                {
                    "idStudySubCategory": 84,
                    "subCategoryName": "ادبي - معهد مفوضي شرطة",
                    "studyCategoryId": 9
                }
            ]
        },
        {
            "idStudyCategory": 10,
            "categoryName": "لايوجد",
            "StudySubCategory": [
                {
                    "idStudySubCategory": 85,
                    "subCategoryName": "لايوجد",
                    "studyCategoryId": 10
                }
            ]
        },
        {
            "idStudyCategory": 67,
            "categoryName": "اسلامي",
            "StudySubCategory": [
                {
                    "idStudySubCategory": 105,
                    "subCategoryName": "الوقف الشيعي",
                    "studyCategoryId": 67
                },
                {
                    "idStudySubCategory": 106,
                    "subCategoryName": "الوقف السني",
                    "studyCategoryId": 67
                }
            ]
        }
    ],
})

export const mutations = {
    set_stepper(state) {
        return state.stepper++
    },

    unset_stepper(state) {
        return state.stepper--
    },

    reset_stepper(state) {
        return (state.stepper = 1)
    },

    set_last_student_id(state, idStudent) {
        return (state.lastStudentRegistered = idStudent)
    },
}

export const getters = {
    getLastStudentRegistered(state) {
        return state.lastStudentRegistered
    }
}

export const actions = {
    saveLastStudentId(context, idStudent) {
        context.commit('set_last_student_id', idStudent)
    }
}