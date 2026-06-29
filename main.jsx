import { useState, useEffect, useRef, useMemo } from "react";
const SCHOOLS = [
  // ── BERKSHIRE ─────────────────────────────────────────────────────────────
  { id: 1, name: "Eton College", county: "Berkshire", town: "Windsor", address: "Windsor, Berkshire, SL4 6DW", lat: 51.4884, lng: -0.6076, type: "Boys", boarding: "Full boarding", ages: "13–18", ageMin: 13, ageMax: 18, termlyFee: 21100, annualFee: 63300, feeVerified: true, isiBand: "Excellent", reviewScore: 4.5, reviewCount: 312, url: "https://www.etoncollege.com", founded: 1440, pupils: 1340, knownFor: [{ label: "Politics & PPE", category: "academic", icon: "🏛️" }, { label: "Wall Game (unique sport)", category: "sport", icon: "⚽" }, { label: "Rowing (Henley)", category: "sport", icon: "🚣" }, { label: "Polo & Beagles", category: "sport", icon: "🏇" }, { label: "Classics & Latin", category: "academic", icon: "📜" }], results: { aLevel: { pct: 99, grades: "A*/A: 81%" }, gcse: { pct: 100, grades: "9-8: 79%" } }, sports: ["rowing","cricket","rugby","football","swimming","polo","fencing","tennis"], academicFocus: ["classics","history","sciences","maths","politics"], arts: ["music","drama","art"], scholarships: ["academic","music","art","sport"], bursaries: true, oxbridge: 90, dofe: true, ccf: true, notable: "20 Prime Ministers, royal family alumni" },
  { id: 2, name: "Wellington College", county: "Berkshire", town: "Crowthorne", address: "Duke's Ride, Crowthorne, Berkshire, RG45 7PU", lat: 51.3617, lng: -0.8198, type: "Co-ed", boarding: "Full/Day", ages: "13–18", ageMin: 13, ageMax: 18, termlyFee: 19480, annualFee: 58440, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.6, reviewCount: 198, url: "https://www.wellingtoncollege.org.uk", founded: 1859, pupils: 1090, knownFor: [{ label: "Wellbeing curriculum (pioneered)", category: "pastoral", icon: "🧠" }, { label: "Hockey (national standard)", category: "sport", icon: "🏑" }, { label: "Design Technology", category: "academic", icon: "🔧" }, { label: "Entrepreneurship programme", category: "academic", icon: "💡" }, { label: "Global citizenship", category: "academic", icon: "🌍" }], results: { aLevel: { pct: 98, grades: "A*/A: 72%" }, gcse: { pct: 100, grades: "9-8: 68%" } }, sports: ["cricket","hockey","swimming","rowing","rugby","tennis","athletics"], academicFocus: ["sciences","history","english","maths","wellbeing"], arts: ["music","drama","art","DT"], scholarships: ["academic","music","art","sport","DT"], bursaries: true, oxbridge: 70, dofe: true, ccf: true, notable: "Founded in memory of the Duke of Wellington" },
  { id: 3, name: "Bradfield College", county: "Berkshire", town: "Bradfield", address: "Bradfield, Reading, Berkshire, RG7 6AU", lat: 51.4597, lng: -1.1353, type: "Co-ed", boarding: "Full/Day", ages: "13–18", ageMin: 13, ageMax: 18, termlyFee: 18480, annualFee: 55440, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.4, reviewCount: 142, url: "https://www.bradfieldcollege.org.uk", founded: 1850, pupils: 830, knownFor: [{ label: "Open-Air Greek Theatre", category: "arts", icon: "🎭" }, { label: "Drama scholarships", category: "arts", icon: "🎬" }, { label: "Shooting (national level)", category: "sport", icon: "🎯" }, { label: "Languages & MFL", category: "academic", icon: "🗺️" }, { label: "All-round boarding life", category: "pastoral", icon: "🏡" }], results: { aLevel: { pct: 97, grades: "A*/A: 61%" }, gcse: { pct: 99, grades: "9-8: 55%" } }, sports: ["cricket","hockey","swimming","tennis","rugby","shooting"], academicFocus: ["english","sciences","humanities","languages"], arts: ["drama","music","art"], scholarships: ["academic","music","art","sport","drama"], bursaries: true, oxbridge: 55, dofe: true, ccf: true, notable: "Famous open-air Greek Theatre productions" },
  { id: 4, name: "Lambrook School", county: "Berkshire", town: "Winkfield Row", address: "Winkfield Row, Bracknell, Berkshire, RG42 6LU", lat: 51.4283, lng: -0.7086, type: "Co-ed", boarding: "Day/Weekly", ages: "3–13", ageMin: 3, ageMax: 13, termlyFee: 10669, annualFee: 32007, feeVerified: true, isiBand: "Excellent", reviewScore: 4.7, reviewCount: 89, url: "https://www.lambrookschool.co.uk", founded: 1860, pupils: 630, knownFor: [{ label: "Swimming academy", category: "sport", icon: "🏊" }, { label: "Royal family connections", category: "pastoral", icon: "👑" }, { label: "100% CE pass rate", category: "academic", icon: "✅" }, { label: "Forest School programme", category: "pastoral", icon: "🌳" }, { label: "Scholarship pipeline to top seniors", category: "academic", icon: "🎓" }], results: { prepNote: "CE: 100% · Senior scholarships every year" }, sports: ["swimming","cricket","hockey","rugby","athletics","tennis","football"], academicFocus: ["maths","english","sciences","languages"], arts: ["music","drama","art"], scholarships: ["academic","music","sport","art"], bursaries: true, oxbridge: null, dofe: false, ccf: false, notable: "Prince George & Princess Charlotte attended", feeNote: "Top Years 5–8 rate shown; younger years are lower (from £6,685/term)." },
  { id: 5, name: "St Piran's School", county: "Berkshire", town: "Maidenhead", address: "Gringer Hill, Maidenhead, Berkshire, SL6 7LZ", lat: 51.5227, lng: -0.7193, type: "Co-ed", boarding: "Day", ages: "3–11", ageMin: 3, ageMax: 11, termlyFee: 6380, annualFee: 19140, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.5, reviewCount: 54, url: "https://www.stpirans.co.uk", founded: 1876, pupils: 350, knownFor: [{ label: "Swimming (county champions)", category: "sport", icon: "🏊" }, { label: "95% to top senior schools", category: "academic", icon: "🎯" }, { label: "Small class sizes", category: "pastoral", icon: "👥" }, { label: "Gymnastics", category: "sport", icon: "🤸" }, { label: "Junior sport focus", category: "sport", icon: "🏅" }], results: { prepNote: "11+ top senior schools: 95%" }, sports: ["swimming","hockey","cricket","athletics","tennis","gymnastics"], academicFocus: ["maths","english","sciences"], arts: ["music","drama","art"], scholarships: ["academic","sport"], bursaries: false, oxbridge: null, dofe: false, ccf: false, notable: "Strong swimming & sports programme" },
  { id: 6, name: "St George's School Windsor Castle", county: "Berkshire", town: "Windsor", address: "Windsor Castle, Windsor, Berkshire, SL4 1QF", lat: 51.4808, lng: -0.6044, type: "Co-ed", boarding: "Day", ages: "3–13", ageMin: 3, ageMax: 13, termlyFee: 9510, annualFee: 28530, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.3, reviewCount: 67, url: "https://www.stgwindsor.org", founded: 1348, pupils: 260, knownFor: [{ label: "Choir school within Windsor Castle", category: "arts", icon: "🎵" }, { label: "Oldest school in UK (1348)", category: "academic", icon: "🏰" }, { label: "Royal choral tradition", category: "arts", icon: "👑" }, { label: "100% CE pass rate", category: "academic", icon: "✅" }, { label: "Unique historic setting", category: "pastoral", icon: "🏛️" }], results: { prepNote: "CE: 100% pass · Scholarship: 45% leavers win awards" }, sports: ["swimming","cricket","rugby","football","athletics","tennis"], academicFocus: ["music","english","maths","history","sciences"], arts: ["choral music","drama","art"], scholarships: ["academic","music","sport"], bursaries: true, oxbridge: null, dofe: false, ccf: false, notable: "Choir school set inside Windsor Castle grounds — founded 1348" },
  { id: 7, name: "St George's School Ascot", county: "Berkshire", town: "Ascot", address: "Wells Lane, Ascot, Berkshire, SL5 7DZ", lat: 51.4073, lng: -0.6723, type: "Girls", boarding: "Day/Boarding", ages: "11–18", ageMin: 11, ageMax: 18, termlyFee: 13370, annualFee: 40110, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.4, reviewCount: 97, url: "https://www.stgeorges-ascot.org.uk", founded: 1877, pupils: 263, knownFor: [{ label: "Top 5% UK value-added", category: "academic", icon: "📈" }, { label: "Intentionally small community", category: "pastoral", icon: "🤝" }, { label: "6-lane swimming pool", category: "sport", icon: "🏊" }, { label: "300-seat theatre", category: "arts", icon: "🎭" }, { label: "Confidence-first ethos", category: "pastoral", icon: "💪" }], results: { aLevel: { pct: 96, grades: "A*/A: 47%" }, gcse: { pct: 98, grades: "9-8: 40%" } }, sports: ["swimming","netball","hockey","tennis","athletics","gymnastics"], academicFocus: ["english","art","sciences","history","languages"], arts: ["drama","music","art","food technology"], scholarships: ["academic","art","drama","music","sport","all-rounder"], bursaries: true, oxbridge: 6, dofe: true, ccf: false, notable: "Winston Churchill attended as a boy; close-knit girls' boarding community" },
  { id: 8, name: "St Mary's School Ascot", county: "Berkshire", town: "Ascot", address: "St Mary's Road, Ascot, Berkshire, SL5 9JF", lat: 51.4088, lng: -0.6625, type: "Girls", boarding: "Full/Day", ages: "11–18", ageMin: 11, ageMax: 18, termlyFee: 16910, annualFee: 50730, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.6, reviewCount: 118, url: "https://www.st-marys-ascot.co.uk", founded: 1885, pupils: 380, knownFor: [{ label: "Catholic boarding (Eton partnership)", category: "pastoral", icon: "✝️" }, { label: "GCSE A*/A: 91% (top Berkshire)", category: "academic", icon: "📊" }, { label: "Fine art (gallery-standard studios)", category: "arts", icon: "🎨" }, { label: "Equestrian programme", category: "sport", icon: "🏇" }, { label: "Small elite boarding community", category: "pastoral", icon: "🏡" }], results: { aLevel: { pct: 99, grades: "A*/A: 77%" }, gcse: { pct: 100, grades: "9-8: 91%" } }, sports: ["netball","swimming","hockey","tennis","athletics","equestrian"], academicFocus: ["sciences","maths","english","art","history"], arts: ["art","music","drama"], scholarships: ["academic","art","music","sport","all-rounder"], bursaries: true, oxbridge: 25, dofe: true, ccf: false, notable: "Catholic girls' boarding; Eton College partnership; exceptional GCSE results" },
  { id: 9, name: "Heathfield School Ascot", county: "Berkshire", town: "Ascot", address: "London Road, Ascot, Berkshire, SL5 8DR", lat: 51.4053, lng: -0.6485, type: "Girls", boarding: "Full/Day", ages: "11–18", ageMin: 11, ageMax: 18, termlyFee: 15560, annualFee: 46680, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.2, reviewCount: 76, url: "https://www.heathfieldschool.net", founded: 1899, pupils: 220, knownFor: [{ label: "Very small school feel", category: "pastoral", icon: "🤝" }, { label: "Strong sixth form support", category: "academic", icon: "📚" }, { label: "Creative arts focus", category: "arts", icon: "🎨" }, { label: "Equestrian nearby", category: "sport", icon: "🏇" }, { label: "Character & confidence building", category: "pastoral", icon: "💪" }], results: { aLevel: { pct: 95, grades: "A*/A: 42%" }, gcse: { pct: 98, grades: "9-8: 38%" } }, sports: ["netball","swimming","tennis","hockey","athletics"], academicFocus: ["english","art","history","sciences","languages"], arts: ["art","drama","music"], scholarships: ["academic","art","music","sport"], bursaries: true, oxbridge: 10, dofe: true, ccf: false, notable: "Small intimate boarding school; strong pastoral community" },
  { id: 10, name: "Downe House", county: "Berkshire", town: "Cold Ash", address: "Cold Ash, Thatcham, Berkshire, RG18 9JJ", lat: 51.4312, lng: -1.2584, type: "Girls", boarding: "Full/Day", ages: "11–18", ageMin: 11, ageMax: 18, termlyFee: 18310, annualFee: 54930, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.5, reviewCount: 143, url: "https://www.downehouse.net", founded: 1907, pupils: 600, knownFor: [{ label: "Global outlook & international links", category: "pastoral", icon: "🌍" }, { label: "Lacrosse (England squad feeders)", category: "sport", icon: "🥍" }, { label: "Drama & performing arts", category: "arts", icon: "🎭" }, { label: "Woodland 110-acre campus", category: "pastoral", icon: "🌳" }, { label: "Strong sixth form", category: "academic", icon: "📚" }], results: { aLevel: { pct: 98, grades: "A*/A: 65%" }, gcse: { pct: 99, grades: "9-8: 59%" } }, sports: ["lacrosse","netball","swimming","hockey","tennis","athletics"], academicFocus: ["sciences","english","languages","history","economics"], arts: ["drama","music","art"], scholarships: ["academic","music","art","sport","drama","all-rounder"], bursaries: true, oxbridge: 30, dofe: true, ccf: false, notable: "Leading girls' boarding; known for global confidence and independence" },
  { id: 11, name: "Reading Blue Coat School", county: "Berkshire", town: "Sonning", address: "Holme Park, Sonning, Reading, Berkshire, RG4 6SU", lat: 51.4673, lng: -0.9192, type: "Co-ed", boarding: "Day", ages: "11–18", ageMin: 11, ageMax: 18, termlyFee: 8600, annualFee: 25800, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.4, reviewCount: 132, url: "https://www.rbcs.org.uk", founded: 1646, pupils: 860, knownFor: [{ label: "Riverside 46-acre campus", category: "pastoral", icon: "🌊" }, { label: "Adventure education programme", category: "sport", icon: "🧗" }, { label: "Co-ed from 2023 (was boys)", category: "pastoral", icon: "🔄" }, { label: "Strong music department", category: "arts", icon: "🎵" }, { label: "Competitive sport", category: "sport", icon: "🏅" }], results: { aLevel: { pct: 97, grades: "A*/A: 58%" }, gcse: { pct: 99, grades: "9-8: 52%" } }, sports: ["rugby","cricket","football","rowing","athletics","swimming","tennis"], academicFocus: ["sciences","economics","history","english","maths"], arts: ["music","drama","art"], scholarships: ["academic","music","sport","art"], bursaries: true, oxbridge: 40, dofe: true, ccf: true, notable: "Historic Berkshire day school on the Thames; co-ed since 2023" },
  { id: 12, name: "The Abbey School Reading", county: "Berkshire", town: "Reading", address: "17 Kendrick Road, Reading, Berkshire, RG1 5DZ", lat: 51.4518, lng: -0.9654, type: "Girls", boarding: "Day", ages: "3–18", ageMin: 3, ageMax: 18, termlyFee: 8130, annualFee: 24390, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.4, reviewCount: 108, url: "https://www.theabbey.co.uk", founded: 1887, pupils: 1000, knownFor: [{ label: "IB & A-Level dual pathway", category: "academic", icon: "🌍" }, { label: "Top Reading girls' school", category: "academic", icon: "📊" }, { label: "All-through 3–18 journey", category: "pastoral", icon: "🎯" }, { label: "Strong sports provision", category: "sport", icon: "🏅" }, { label: "Extensive co-curricular offer", category: "arts", icon: "🎭" }], results: { aLevel: { pct: 97, grades: "A*/A: 62%" }, gcse: { pct: 99, grades: "9-8: 56%" } }, sports: ["netball","hockey","swimming","tennis","athletics","cricket"], academicFocus: ["sciences","english","languages","maths","economics"], arts: ["music","drama","art"], scholarships: ["academic","music","sport","art"], bursaries: true, oxbridge: 30, dofe: true, ccf: false, notable: "Leading Reading girls' school offering IB and A-Levels" },
  { id: 13, name: "Queen Anne's School", county: "Berkshire", town: "Caversham", address: "6 Henley Road, Caversham, Reading, Berkshire, RG4 6DX", lat: 51.4872, lng: -1.0125, type: "Girls", boarding: "Day/Boarding", ages: "11–18", ageMin: 11, ageMax: 18, termlyFee: 12280, annualFee: 36840, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.5, reviewCount: 89, url: "https://www.qas.org.uk", founded: 1894, pupils: 470, knownFor: [{ label: "Pastoral Care Award 2024", category: "pastoral", icon: "🏆" }, { label: "Wellbeing & digital literacy", category: "pastoral", icon: "🧠" }, { label: "Rowing (Thames-side)", category: "sport", icon: "🚣" }, { label: "Flexible boarding options", category: "pastoral", icon: "🏡" }, { label: "Strong careers provision", category: "academic", icon: "💼" }], results: { aLevel: { pct: 97, grades: "A*/A: 58%" }, gcse: { pct: 99, grades: "9-8: 52%" } }, sports: ["rowing","netball","hockey","swimming","tennis","athletics"], academicFocus: ["sciences","english","history","languages","economics"], arts: ["music","drama","art"], scholarships: ["academic","music","sport","art","all-rounder"], bursaries: true, oxbridge: 20, dofe: true, ccf: false, notable: "Award-winning pastoral care; 130+ years of girls' education" },
  { id: 14, name: "Pangbourne College", county: "Berkshire", town: "Pangbourne", address: "Pangbourne, Reading, Berkshire, RG8 8LA", lat: 51.4889, lng: -1.1351, type: "Co-ed", boarding: "Full/Day", ages: "11–18", ageMin: 11, ageMax: 18, termlyFee: 14270, annualFee: 42810, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.3, reviewCount: 97, url: "https://www.pangbourne.com", founded: 1917, pupils: 450, knownFor: [{ label: "Nautical heritage & CCF Navy", category: "pastoral", icon: "⚓" }, { label: "Duke of Edinburgh (Gold standard)", category: "pastoral", icon: "🏅" }, { label: "River Thames water sports", category: "sport", icon: "🚣" }, { label: "Small school, individual focus", category: "pastoral", icon: "🤝" }, { label: "Strong leadership ethos", category: "pastoral", icon: "👑" }], results: { aLevel: { pct: 96, grades: "A*/A: 52%" }, gcse: { pct: 98, grades: "9-8: 46%" } }, sports: ["rowing","rugby","cricket","swimming","hockey","shooting","athletics"], academicFocus: ["sciences","history","english","economics","DT"], arts: ["music","drama","art"], scholarships: ["academic","music","sport","art","all-rounder"], bursaries: true, oxbridge: 15, dofe: true, ccf: true, notable: "Unique nautical college heritage on the River Thames" },
  { id: 15, name: "Elstree School", county: "Berkshire", town: "Woolhampton", address: "Woolhampton Hill, Woolhampton, Reading, Berkshire, RG7 5TD", lat: 51.4118, lng: -1.1968, type: "Co-ed", boarding: "Day/Boarding", ages: "3–13", ageMin: 3, ageMax: 13, termlyFee: 10760, annualFee: 32280, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.6, reviewCount: 72, url: "https://www.elstree.berks.sch.uk", founded: 1848, pupils: 380, knownFor: [{ label: "150-acre outdoor campus", category: "pastoral", icon: "🌳" }, { label: "Scholarship pipeline to top seniors", category: "academic", icon: "🎓" }, { label: "Outdoor & adventure education", category: "sport", icon: "🧗" }, { label: "Weekly boarding option", category: "pastoral", icon: "🏡" }, { label: "Cricket & team sport", category: "sport", icon: "🏏" }], results: { prepNote: "CE: 100% · Regular scholarships to Eton, Winchester, Marlborough" }, sports: ["cricket","rugby","football","hockey","swimming","athletics","tennis"], academicFocus: ["maths","english","sciences","languages","history"], arts: ["music","drama","art"], scholarships: ["academic","sport","music","art"], bursaries: true, oxbridge: null, dofe: false, ccf: false, notable: "150 acres of Berkshire countryside; outstanding prep school tradition" },
  { id: 16, name: "Cheam School", county: "Berkshire", town: "Headley", address: "Headley, Newbury, Berkshire, RG19 8LD", lat: 51.3264, lng: -1.2839, type: "Co-ed", boarding: "Day/Boarding", ages: "3–13", ageMin: 3, ageMax: 13, termlyFee: 10650, annualFee: 31950, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.3, reviewCount: 82, url: "https://www.cheamschool.com", founded: 1645, pupils: 480, knownFor: [{ label: "Oldest prep school in UK (1645)", category: "academic", icon: "🏛️" }, { label: "King Charles III attended", category: "pastoral", icon: "👑" }, { label: "100% CE pass; senior scholarship winners", category: "academic", icon: "🎓" }, { label: "Outstanding Hampshire/Berks grounds", category: "pastoral", icon: "🌳" }, { label: "Leadership & character ethos", category: "pastoral", icon: "💪" }], results: { prepNote: "CE 100% · Scholarships to top seniors annually" }, sports: ["cricket","rugby","football","hockey","swimming","athletics","tennis"], academicFocus: ["maths","english","sciences","languages","history"], arts: ["music","drama","art"], scholarships: ["academic","music","sport","art"], bursaries: true, oxbridge: null, dofe: false, ccf: false, notable: "Oldest prep in UK (1645); King Charles III attended" },
  { id: 17, name: "Leighton Park School", county: "Berkshire", town: "Reading", address: "Shinfield Road, Reading, Berkshire, RG2 7ED", lat: 51.4238, lng: -0.9625, type: "Co-ed", boarding: "Day/Boarding", ages: "11–18", ageMin: 11, ageMax: 18, termlyFee: 9890, annualFee: 29670, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.4, reviewCount: 76, url: "https://www.leightonpark.com", founded: 1890, pupils: 520, knownFor: [{ label: "Quaker values & small classes", category: "pastoral", icon: "☮️" }, { label: "Best Co-ed School 2022 (SE)", category: "pastoral", icon: "🏆" }, { label: "65-acre parkland Reading", category: "pastoral", icon: "🌳" }, { label: "Music (specialist strength)", category: "arts", icon: "🎵" }, { label: "Inclusive, anti-bullying culture", category: "pastoral", icon: "🤝" }], results: { aLevel: { pct: 96, grades: "A*/A: 48%" }, gcse: { pct: 98, grades: "9-8: 44%" } }, sports: ["football","cricket","swimming","hockey","athletics","tennis","rugby"], academicFocus: ["sciences","english","history","maths","languages"], arts: ["music","drama","art"], scholarships: ["academic","music","sport","art"], bursaries: true, oxbridge: 20, dofe: true, ccf: false, notable: "Quaker ethos; multi-award-winning co-educational school" },
  { id: 18, name: "LVS Ascot", county: "Berkshire", town: "Ascot", address: "London Road, Ascot, Berkshire, SL5 8DR", lat: 51.4042, lng: -0.6511, type: "Co-ed", boarding: "Day/Boarding", ages: "4–18", ageMin: 4, ageMax: 18, termlyFee: 7250, annualFee: 21750, feeEstimated: true, isiBand: "Good", reviewScore: 4.0, reviewCount: 88, url: "https://www.lvs.ascot.sch.uk", founded: 1803, pupils: 860, knownFor: [{ label: "Non-selective all-ability", category: "pastoral", icon: "🤝" }, { label: "Affordable Ascot boarding", category: "pastoral", icon: "💰" }, { label: "All-through 4–18", category: "pastoral", icon: "🎯" }, { label: "Broad co-curricular offer", category: "arts", icon: "🎭" }, { label: "25-acre parkland campus", category: "pastoral", icon: "🌳" }], results: { aLevel: { pct: 93, grades: "A*/A: 28%" }, gcse: { pct: 95, grades: "9-8: 24%" } }, sports: ["football","rugby","netball","swimming","athletics","tennis"], academicFocus: ["english","sciences","history","maths","DT"], arts: ["music","drama","art"], scholarships: ["academic","sport","art","music"], bursaries: true, oxbridge: 5, dofe: true, ccf: false, notable: "Proudly non-selective; egalitarian values; boarding from Year 6" },
  { id: 19, name: "Crosfields School", county: "Berkshire", town: "Reading", address: "Shinfield Road, Reading, Berkshire, RG2 9BL", lat: 51.4195, lng: -0.9561, type: "Co-ed", boarding: "Day", ages: "3–16", ageMin: 3, ageMax: 16, termlyFee: 6790, annualFee: 20370, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.3, reviewCount: 65, url: "https://www.crosfields.com", founded: 1931, pupils: 640, knownFor: [{ label: "Nurturing full-ability range", category: "pastoral", icon: "🤝" }, { label: "Small class sizes", category: "pastoral", icon: "👥" }, { label: "Two-working-parent friendly", category: "pastoral", icon: "⏰" }, { label: "Good all-round sport", category: "sport", icon: "🏅" }, { label: "3–16 all-through", category: "pastoral", icon: "🎯" }], results: { gcse: { pct: 95, grades: "9-8: 32%" } }, sports: ["cricket","hockey","rugby","football","swimming","athletics","tennis"], academicFocus: ["maths","english","sciences","DT","art"], arts: ["music","drama","art"], scholarships: ["academic","sport","music"], bursaries: true, oxbridge: null, dofe: true, ccf: false, notable: "Friendly, nurturing Reading day school from 3 to 16" },
  // ── BUCKINGHAMSHIRE ────────────────────────────────────────────────────────
  { id: 30, name: "Stowe School", county: "Buckinghamshire", town: "Buckingham", address: "Stowe, Buckingham, Buckinghamshire, MK18 5EH", lat: 52.0167, lng: -0.9854, type: "Co-ed", boarding: "Full/Day", ages: "13–18", ageMin: 13, ageMax: 18, termlyFee: 18600, annualFee: 55800, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.4, reviewCount: 167, url: "https://www.stowe.co.uk", founded: 1923, pupils: 920, knownFor: [{ label: "UNESCO landscape gardens", category: "pastoral", icon: "🌿" }, { label: "Art & Design (DT scholarships)", category: "arts", icon: "🎨" }, { label: "Polo & equestrian", category: "sport", icon: "🏇" }, { label: "Golf (championship course)", category: "sport", icon: "⛳" }, { label: "Creative & entrepreneurial culture", category: "pastoral", icon: "💡" }], results: { aLevel: { pct: 97, grades: "A*/A: 57%" }, gcse: { pct: 99, grades: "9-8: 50%" } }, sports: ["cricket","swimming","hockey","polo","golf","rugby","football","shooting"], academicFocus: ["history","english","economics","art","DT"], arts: ["drama","music","art","DT"], scholarships: ["academic","music","art","sport","DT"], bursaries: true, oxbridge: 40, dofe: true, ccf: true, notable: "Iconic landscape gardens; creative arts tradition" },
  { id: 31, name: "Wycombe Abbey", county: "Buckinghamshire", town: "High Wycombe", address: "Abbey Way, High Wycombe, Buckinghamshire, HP11 1PE", lat: 51.6287, lng: -0.7482, type: "Girls", boarding: "Full", ages: "11–18", ageMin: 11, ageMax: 18, termlyFee: 20500, annualFee: 58572, feeVerified: true, isiBand: "Excellent", reviewScore: 4.7, reviewCount: 134, url: "https://www.wycombeabbey.com", founded: 1896, pupils: 650, knownFor: [{ label: "Oxbridge (85% offer rate)", category: "academic", icon: "🎓" }, { label: "Lacrosse (England players)", category: "sport", icon: "🥍" }, { label: "Sciences for girls (top UK)", category: "academic", icon: "🔬" }, { label: "Rowing squad", category: "sport", icon: "🚣" }, { label: "Full boarding community", category: "pastoral", icon: "🏡" }], results: { aLevel: { pct: 100, grades: "A*/A: 76%" }, gcse: { pct: 100, grades: "9-8: 81%" } }, sports: ["lacrosse","netball","swimming","hockey","tennis","athletics","rowing"], academicFocus: ["sciences","maths","english","history","languages"], arts: ["music","drama","art"], scholarships: ["academic","music","art","sport"], bursaries: true, oxbridge: 85, dofe: true, ccf: false, notable: "Top girls' boarding; elite Oxbridge entry" },
  { id: 32, name: "Pipers Corner School", county: "Buckinghamshire", town: "Great Kingshill", address: "Pipers Lane, Great Kingshill, High Wycombe, Buckinghamshire, HP15 6LP", lat: 51.6621, lng: -0.7432, type: "Girls", boarding: "Day/Boarding", ages: "4–18", ageMin: 4, ageMax: 18, termlyFee: 9130, annualFee: 27390, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.4, reviewCount: 82, url: "https://www.piperscorner.co.uk", founded: 1947, pupils: 548, knownFor: [{ label: "36 acres Chiltern countryside", category: "pastoral", icon: "🌳" }, { label: "All girls 4–18 journey", category: "pastoral", icon: "🎯" }, { label: "Strong sport provision", category: "sport", icon: "🏅" }, { label: "Broad co-curricular", category: "arts", icon: "🎭" }, { label: "Flexible boarding", category: "pastoral", icon: "🏡" }], results: { aLevel: { pct: 96, grades: "A*/A: 45%" }, gcse: { pct: 98, grades: "9-8: 40%" } }, sports: ["netball","hockey","swimming","athletics","tennis","football"], academicFocus: ["sciences","english","history","maths","languages"], arts: ["music","drama","art"], scholarships: ["academic","music","sport","art"], bursaries: true, oxbridge: 15, dofe: true, ccf: false, notable: "Girls' all-through school in beautiful Chiltern countryside" },
  { id: 33, name: "St Mary's School Gerrards Cross", county: "Buckinghamshire", town: "Gerrards Cross", address: "Packhorse Road, Gerrards Cross, Buckinghamshire, SL9 8JQ", lat: 51.5859, lng: -0.5573, type: "Girls", boarding: "Day", ages: "3–18", ageMin: 3, ageMax: 18, termlyFee: 8070, annualFee: 24210, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.3, reviewCount: 67, url: "https://www.st-marys-school.com", founded: 1872, pupils: 450, knownFor: [{ label: "Anglican girls school 3–18", category: "pastoral", icon: "✝️" }, { label: "Strong pastoral care", category: "pastoral", icon: "🤝" }, { label: "Arts & drama programme", category: "arts", icon: "🎭" }, { label: "Character development focus", category: "pastoral", icon: "💪" }, { label: "Accessible South Bucks", category: "pastoral", icon: "📍" }], results: { aLevel: { pct: 95, grades: "A*/A: 44%" }, gcse: { pct: 97, grades: "9-8: 39%" } }, sports: ["netball","hockey","swimming","tennis","athletics"], academicFocus: ["english","sciences","history","maths","languages"], arts: ["drama","music","art"], scholarships: ["academic","music","sport","art"], bursaries: true, oxbridge: 12, dofe: true, ccf: false, notable: "Long-established Anglican girls' school in South Bucks" },
  { id: 34, name: "The Beacon School", county: "Buckinghamshire", town: "Chesham Bois", address: "Amersham Road, Chesham Bois, Amersham, Buckinghamshire, HP6 5PF", lat: 51.6576, lng: -0.5955, type: "Boys", boarding: "Day", ages: "3–13", ageMin: 3, ageMax: 13, termlyFee: 7250, annualFee: 21750, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.4, reviewCount: 58, url: "https://www.beaconschool.co.uk", founded: 1954, pupils: 520, knownFor: [{ label: "Academic excellence (top Bucks prep)", category: "academic", icon: "📊" }, { label: "Boys prep 3–13", category: "pastoral", icon: "👦" }, { label: "Scholarship pipeline", category: "academic", icon: "🎓" }, { label: "Sports tradition", category: "sport", icon: "🏅" }, { label: "Strong pastoral ethos", category: "pastoral", icon: "🤝" }], results: { prepNote: "CE: 100% · Scholarships to Eton, Harrow, Stowe annually" }, sports: ["cricket","rugby","football","hockey","swimming","athletics"], academicFocus: ["maths","english","sciences","languages","classics"], arts: ["music","drama","art"], scholarships: ["academic","music","sport"], bursaries: true, oxbridge: null, dofe: false, ccf: false, notable: "Leading Bucks boys' prep; strong scholarship track record" },
  { id: 35, name: "Godstowe Preparatory School", county: "Buckinghamshire", town: "High Wycombe", address: "Shrubbery Road, High Wycombe, Buckinghamshire, HP13 6PR", lat: 51.6342, lng: -0.7605, type: "Girls", boarding: "Day/Boarding", ages: "3–13", ageMin: 3, ageMax: 13, termlyFee: 8780, annualFee: 26340, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.5, reviewCount: 61, url: "https://www.godstowe.org", founded: 1900, pupils: 480, knownFor: [{ label: "Only girls' boarding prep in Bucks", category: "pastoral", icon: "🏡" }, { label: "Scholarship winners to Wycombe Abbey", category: "academic", icon: "🎓" }, { label: "Sports & outdoor ethos", category: "sport", icon: "🏅" }, { label: "Creative arts programme", category: "arts", icon: "🎨" }, { label: "Happy, nurturing environment", category: "pastoral", icon: "🌟" }], results: { prepNote: "CE: 100% · Regular scholarships to Wycombe Abbey, Benenden, Downe House" }, sports: ["netball","hockey","swimming","athletics","tennis","gymnastics"], academicFocus: ["maths","english","sciences","languages"], arts: ["music","drama","art"], scholarships: ["academic","music","sport","art"], bursaries: true, oxbridge: null, dofe: false, ccf: false, notable: "The only girls' boarding prep in Buckinghamshire" },
  { id: 36, name: "Davenies School", county: "Buckinghamshire", town: "Beaconsfield", address: "Station Road, Beaconsfield, Buckinghamshire, HP9 1AA", lat: 51.5978, lng: -0.6413, type: "Boys", boarding: "Day", ages: "4–13", ageMin: 4, ageMax: 13, termlyFee: 7490, annualFee: 22470, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.3, reviewCount: 49, url: "https://www.davenies.co.uk", founded: 1949, pupils: 310, knownFor: [{ label: "Boys' prep Beaconsfield", category: "pastoral", icon: "👦" }, { label: "Individual focus & pastoral care", category: "pastoral", icon: "🤝" }, { label: "Pre-test preparation (ISEB)", category: "academic", icon: "📝" }, { label: "Sport & team spirit", category: "sport", icon: "🏅" }, { label: "Strong outdoor education", category: "sport", icon: "🌳" }], results: { prepNote: "CE: 100% · Boys prepared for senior selective schools via ISEB pre-tests" }, sports: ["cricket","football","rugby","hockey","swimming","athletics"], academicFocus: ["maths","english","sciences","languages"], arts: ["music","drama","art"], scholarships: ["academic","sport","music"], bursaries: true, oxbridge: null, dofe: false, ccf: false, notable: "Popular Beaconsfield boys' prep; strong senior school placement record" },
  { id: 37, name: "Swanbourne House School", county: "Buckinghamshire", town: "Swanbourne", address: "Swanbourne, Milton Keynes, Buckinghamshire, MK17 0HZ", lat: 51.9468, lng: -0.8351, type: "Co-ed", boarding: "Day/Boarding", ages: "3–13", ageMin: 3, ageMax: 13, termlyFee: 9590, annualFee: 28770, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.4, reviewCount: 55, url: "https://www.swanbournehouse.com", founded: 1920, pupils: 350, knownFor: [{ label: "Co-ed boarding prep (rare in Bucks)", category: "pastoral", icon: "🏡" }, { label: "Country estate setting", category: "pastoral", icon: "🌳" }, { label: "Strong sport & outdoor pursuits", category: "sport", icon: "🏅" }, { label: "Scholarship results", category: "academic", icon: "🎓" }, { label: "Christian values (CofE)", category: "pastoral", icon: "✝️" }], results: { prepNote: "CE: 100% · Scholarships to Stowe, Rugby, Oundle annually" }, sports: ["cricket","rugby","hockey","football","swimming","athletics","tennis"], academicFocus: ["maths","english","sciences","history"], arts: ["music","drama","art"], scholarships: ["academic","music","sport","art"], bursaries: true, oxbridge: null, dofe: false, ccf: false, notable: "Co-ed boarding prep in North Bucks with country estate feel" },
  { id: 38, name: "Maltman's Green School", county: "Buckinghamshire", town: "Chalfont St Peter", address: "Maltmans Lane, Gerrards Cross, Buckinghamshire, SL9 8RR", lat: 51.5909, lng: -0.5441, type: "Girls", boarding: "Day", ages: "3–11", ageMin: 3, ageMax: 11, termlyFee: 6900, annualFee: 20700, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.5, reviewCount: 48, url: "https://www.maltmansgreen.com", founded: 1930, pupils: 420, knownFor: [{ label: "Girls' pre-prep & prep (3–11)", category: "pastoral", icon: "👧" }, { label: "Top 11+ results in South Bucks", category: "academic", icon: "📊" }, { label: "Outstanding pastoral care", category: "pastoral", icon: "🤝" }, { label: "Gymnastics & swimming", category: "sport", icon: "🤸" }, { label: "Strong performing arts", category: "arts", icon: "🎭" }], results: { prepNote: "11+ excellent: pupils go to Wycombe Abbey, Pipers Corner, St Helen's" }, sports: ["gymnastics","swimming","netball","hockey","athletics","tennis"], academicFocus: ["maths","english","sciences","languages"], arts: ["music","drama","art"], scholarships: ["academic","music","sport"], bursaries: true, oxbridge: null, dofe: false, ccf: false, notable: "Leading girls' junior prep in South Bucks; strong 11+ outcomes" },
  { id: 39, name: "High March School", county: "Buckinghamshire", town: "Beaconsfield", address: "23 Ledborough Lane, Beaconsfield, Buckinghamshire, HP9 2PZ", lat: 51.6066, lng: -0.6451, type: "Girls", boarding: "Day", ages: "3–11", ageMin: 3, ageMax: 11, termlyFee: 6440, annualFee: 19320, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.4, reviewCount: 44, url: "https://www.highmarch.co.uk", founded: 1942, pupils: 280, knownFor: [{ label: "Girls' prep 3–11 Beaconsfield", category: "pastoral", icon: "👧" }, { label: "High 11+ success rate", category: "academic", icon: "📊" }, { label: "Strong performing arts", category: "arts", icon: "🎭" }, { label: "Nurturing girls-only environment", category: "pastoral", icon: "🤝" }, { label: "Sport & swimming", category: "sport", icon: "🏊" }], results: { prepNote: "Strong 11+ results; leavers to Wycombe Abbey, Pipers Corner, Maltman's Green" }, sports: ["gymnastics","swimming","netball","hockey","athletics","tennis"], academicFocus: ["maths","english","sciences"], arts: ["music","drama","art"], scholarships: ["academic","music"], bursaries: true, oxbridge: null, dofe: false, ccf: false, notable: "Well-regarded girls' prep in Beaconsfield with strong 11+ track" },
  { id: 40, name: "Thornton College", county: "Buckinghamshire", town: "Thornton", address: "Thornton, Milton Keynes, Buckinghamshire, MK17 0HJ", lat: 51.9671, lng: -0.8492, type: "Girls", boarding: "Day/Boarding", ages: "3–18", ageMin: 3, ageMax: 18, termlyFee: 6790, annualFee: 20370, feeEstimated: true, isiBand: "Good", reviewScore: 4.1, reviewCount: 42, url: "https://www.thornton.bucks.sch.uk", founded: 1948, pupils: 440, knownFor: [{ label: "Roman Catholic girls' all-through", category: "pastoral", icon: "✝️" }, { label: "Armed Forces discount (10%)", category: "pastoral", icon: "🎖️" }, { label: "Nurturing faith community", category: "pastoral", icon: "🤝" }, { label: "Affordable boarding option", category: "pastoral", icon: "💰" }, { label: "Broad curriculum 3–18", category: "academic", icon: "📚" }], results: { aLevel: { pct: 92, grades: "A*/A: 24%" }, gcse: { pct: 95, grades: "9-8: 20%" } }, sports: ["netball","hockey","swimming","athletics","tennis"], academicFocus: ["english","sciences","history","maths","RE"], arts: ["music","drama","art"], scholarships: ["academic","music","sport"], bursaries: true, oxbridge: 5, dofe: true, ccf: false, notable: "Catholic girls' school near Milton Keynes; Armed Forces discount" },
  { id: 41, name: "Akeley Wood Senior School", county: "Buckinghamshire", town: "Akeley", address: "Akeley Wood, Buckingham, Buckinghamshire, MK18 5AE", lat: 52.0458, lng: -0.9619, type: "Co-ed", boarding: "Day", ages: "11–18", ageMin: 11, ageMax: 18, termlyFee: 6080, annualFee: 18240, feeEstimated: true, isiBand: "Good", reviewScore: 4.0, reviewCount: 54, url: "https://www.akeleywood.co.uk", founded: 1935, pupils: 380, knownFor: [{ label: "Affordable North Bucks option", category: "pastoral", icon: "💰" }, { label: "Small classes & individual support", category: "pastoral", icon: "👥" }, { label: "Performing arts & drama", category: "arts", icon: "🎭" }, { label: "All-through co-ed", category: "pastoral", icon: "🎯" }, { label: "Stowe feeder community", category: "academic", icon: "🏫" }], results: { aLevel: { pct: 92, grades: "A*/A: 22%" }, gcse: { pct: 94, grades: "9-8: 18%" } }, sports: ["football","cricket","netball","hockey","swimming"], academicFocus: ["sciences","english","history","maths","DT"], arts: ["drama","music","art"], scholarships: ["academic","sport","art"], bursaries: true, oxbridge: 5, dofe: true, ccf: false, notable: "Accessible co-ed independent near Buckingham" },
  // ── SURREY (inc TASIS) ────────────────────────────────────────────────────
  { id: 50, name: "TASIS The American School", county: "Surrey", town: "Thorpe", address: "Coldharbour Lane, Thorpe, Surrey, TW20 8TE", lat: 51.4233, lng: -0.5101, type: "Co-ed", boarding: "Day/Boarding", ages: "3–18", ageMin: 3, ageMax: 18, termlyFee: 11340, annualFee: 34020, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.5, reviewCount: 142, url: "https://www.tasisengland.org", founded: 1976, pupils: 660, knownFor: [{ label: "American curriculum & AP courses", category: "academic", icon: "🇺🇸" }, { label: "IB Diploma Programme", category: "academic", icon: "🌍" }, { label: "60+ nationalities on campus", category: "pastoral", icon: "✈️" }, { label: "ISA Boarding Award 2023", category: "pastoral", icon: "🏆" }, { label: "20 min from Heathrow", category: "pastoral", icon: "🛫" }], results: { ibPct: 94, ibAvg: "34/45", prepNote: "US Diploma · AP courses · IB Diploma · UK & US university placements" }, sports: ["basketball","football","swimming","tennis","athletics","volleyball"], academicFocus: ["AP sciences","AP maths","languages","IB diploma","arts"], arts: ["studio arts","theatre","dance","music","photography","film"], scholarships: ["academic","sport","art","all-rounder"], bursaries: true, oxbridge: 5, dofe: true, ccf: false, notable: "Leading US-curriculum international school near London; 60+ nationalities" },
  { id: 51, name: "Charterhouse", county: "Surrey", town: "Godalming", address: "Charterhouse, Godalming, Surrey, GU7 2DX", lat: 51.1853, lng: -0.6201, type: "Co-ed", boarding: "Full/Day", ages: "13–18", ageMin: 13, ageMax: 18, termlyFee: 18570, annualFee: 55710, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.4, reviewCount: 224, url: "https://www.charterhouse.org.uk", founded: 1611, pupils: 900, knownFor: [{ label: "Association Football (invented here)", category: "sport", icon: "⚽" }, { label: "Golf (exceptional course)", category: "sport", icon: "⛳" }, { label: "Economics & business", category: "academic", icon: "📈" }, { label: "Music (dedicated school)", category: "arts", icon: "🎵" }, { label: "Historic Clarendon pedigree", category: "pastoral", icon: "🏛️" }], results: { aLevel: { pct: 97, grades: "A*/A: 68%" }, gcse: { pct: 100, grades: "9-8: 61%" } }, sports: ["cricket","football","hockey","swimming","tennis","shooting","golf"], academicFocus: ["sciences","history","economics","english","maths"], arts: ["music","drama","art","DT"], scholarships: ["academic","music","art","sport"], bursaries: true, oxbridge: 65, dofe: true, ccf: true, notable: "One of the original Clarendon schools; football was codified here" },
  { id: 52, name: "Whitgift School", county: "Surrey", town: "South Croydon", address: "Haling Park, South Croydon, Surrey, CR2 6YT", lat: 51.3628, lng: -0.1033, type: "Boys", boarding: "Day", ages: "10–18", ageMin: 10, ageMax: 18, termlyFee: 9300, annualFee: 27900, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.5, reviewCount: 201, url: "https://www.whitgift.co.uk", founded: 1596, pupils: 1440, knownFor: [{ label: "Cricket (England players)", category: "sport", icon: "🏏" }, { label: "Swimming (Olympic pathway)", category: "sport", icon: "🏊" }, { label: "Generous bursary programme", category: "pastoral", icon: "💷" }, { label: "STEM & science block", category: "academic", icon: "🔬" }, { label: "Top Surrey A-level results", category: "academic", icon: "📊" }], results: { aLevel: { pct: 98, grades: "A*/A: 74%" }, gcse: { pct: 100, grades: "9-8: 70%" } }, sports: ["cricket","rugby","swimming","athletics","hockey","football","tennis"], academicFocus: ["sciences","maths","economics","history","english"], arts: ["music","drama","art"], scholarships: ["academic","music","sport","art"], bursaries: true, oxbridge: 72, dofe: true, ccf: true, notable: "Top cricket school; very strong bursary programme" },
  { id: 53, name: "Royal Grammar School Guildford", county: "Surrey", town: "Guildford", address: "High Street, Guildford, Surrey, GU1 3BB", lat: 51.2382, lng: -0.5735, type: "Boys", boarding: "Day", ages: "11–18", ageMin: 11, ageMax: 18, termlyFee: 8040, annualFee: 24120, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.6, reviewCount: 188, url: "https://www.rgsg.co.uk", founded: 1509, pupils: 960, knownFor: [{ label: "Oxbridge (78% who apply)", category: "academic", icon: "🎓" }, { label: "Maths Olympiad winners", category: "academic", icon: "➕" }, { label: "Competitive rugby", category: "sport", icon: "🏉" }, { label: "Classics & Latin", category: "academic", icon: "📜" }, { label: "Outstanding value day school", category: "pastoral", icon: "💰" }], results: { aLevel: { pct: 99, grades: "A*/A: 79%" }, gcse: { pct: 100, grades: "9-8: 73%" } }, sports: ["rugby","cricket","hockey","swimming","athletics","tennis","football"], academicFocus: ["sciences","maths","economics","classics","history"], arts: ["music","drama"], scholarships: ["academic","music","sport"], bursaries: true, oxbridge: 78, dofe: true, ccf: true, notable: "Consistently top Surrey day school" },
  // ── LONDON ────────────────────────────────────────────────────────────────
  { id: 60, name: "Harrow School", county: "London", town: "Harrow on the Hill", address: "High Street, Harrow on the Hill, London, HA1 3HP", lat: 51.5739, lng: -0.3356, type: "Boys", boarding: "Full", ages: "13–18", ageMin: 13, ageMax: 18, termlyFee: 19600, annualFee: 58800, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.5, reviewCount: 289, url: "https://www.harrowschool.org.uk", founded: 1572, pupils: 830, knownFor: [{ label: "Harrow football (unique sport)", category: "sport", icon: "⚽" }, { label: "Polo & shooting", category: "sport", icon: "🏇" }, { label: "Song & choral tradition", category: "arts", icon: "🎵" }, { label: "Global political alumni", category: "academic", icon: "🌍" }, { label: "Leadership development", category: "pastoral", icon: "👑" }], results: { aLevel: { pct: 98, grades: "A*/A: 71%" }, gcse: { pct: 100, grades: "9-8: 65%" } }, sports: ["cricket","football","rugby","swimming","polo","shooting","fencing","tennis","golf"], academicFocus: ["sciences","history","classics","maths","economics"], arts: ["music","drama","art"], scholarships: ["academic","music","art","sport"], bursaries: true, oxbridge: 72, dofe: true, ccf: true, notable: "Churchill, Nehru, King Hussein alumni" },
  { id: 61, name: "Westminster School", county: "London", town: "Westminster", address: "17 Dean's Yard, Westminster, London, SW1P 3PB", lat: 51.4978, lng: -0.1267, type: "Co-ed", boarding: "Day/Boarding", ages: "13–18", ageMin: 13, ageMax: 18, termlyFee: 17890, annualFee: 53670, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.8, reviewCount: 312, url: "https://www.westminster.org.uk", founded: 1179, pupils: 760, knownFor: [{ label: "#1 Oxbridge entry rate UK", category: "academic", icon: "🏆" }, { label: "Maths & Sciences (elite)", category: "academic", icon: "🔬" }, { label: "Classics (Latin & Greek)", category: "academic", icon: "📜" }, { label: "Rowing on the Thames", category: "sport", icon: "🚣" }, { label: "Political debate & philosophy", category: "academic", icon: "🗣️" }], results: { aLevel: { pct: 100, grades: "A*/A: 90%" }, gcse: { pct: 100, grades: "9-8: 88%" } }, sports: ["rowing","football","swimming","cricket","athletics","tennis"], academicFocus: ["sciences","maths","classics","history","economics","languages"], arts: ["music","drama","art"], scholarships: ["academic","music","art","sport","all-rounder"], bursaries: true, oxbridge: 95, dofe: true, ccf: false, notable: "Highest Oxbridge entry rate of any school" },
  { id: 62, name: "St Paul's School", county: "London", town: "Barnes", address: "Lonsdale Road, Barnes, London, SW13 9JT", lat: 51.4701, lng: -0.2354, type: "Boys", boarding: "Day", ages: "13–18", ageMin: 13, ageMax: 18, termlyFee: 11160, annualFee: 33480, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.7, reviewCount: 241, url: "https://www.stpaulsschool.org.uk", founded: 1509, pupils: 880, knownFor: [{ label: "Rowing (national champions)", category: "sport", icon: "🚣" }, { label: "Maths (UK top day school)", category: "academic", icon: "➕" }, { label: "Classics & ancient languages", category: "academic", icon: "📜" }, { label: "Surgemaster's scholarship", category: "academic", icon: "🎓" }, { label: "London day school value", category: "pastoral", icon: "💰" }], results: { aLevel: { pct: 100, grades: "A*/A: 88%" }, gcse: { pct: 100, grades: "9-8: 84%" } }, sports: ["rowing","cricket","football","swimming","rugby","tennis","athletics"], academicFocus: ["sciences","maths","classics","economics","history"], arts: ["music","drama","art"], scholarships: ["academic","music","art","sport"], bursaries: true, oxbridge: 90, dofe: true, ccf: false, notable: "Top academic day school; exceptional Oxbridge record" },
  // ── KENT ─────────────────────────────────────────────────────────────────
  { id: 70, name: "Tonbridge School", county: "Kent", town: "Tonbridge", address: "High Street, Tonbridge, Kent, TN9 1JP", lat: 51.1952, lng: 0.2713, type: "Boys", boarding: "Full/Day", ages: "13–18", ageMin: 13, ageMax: 18, termlyFee: 19160, annualFee: 57480, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.6, reviewCount: 198, url: "https://www.tonbridge-school.co.uk", founded: 1553, pupils: 790, knownFor: [{ label: "Cricket (England internationals)", category: "sport", icon: "🏏" }, { label: "Rowing (top Henley school)", category: "sport", icon: "🚣" }, { label: "All-round boarding excellence", category: "pastoral", icon: "🏡" }, { label: "Golf (on-site course)", category: "sport", icon: "⛳" }, { label: "Sciences & medicine pathways", category: "academic", icon: "🔬" }], results: { aLevel: { pct: 99, grades: "A*/A: 77%" }, gcse: { pct: 100, grades: "9-8: 71%" } }, sports: ["cricket","rugby","hockey","rowing","swimming","tennis","football","golf"], academicFocus: ["sciences","maths","history","economics","english"], arts: ["music","drama","art"], scholarships: ["academic","music","art","sport"], bursaries: true, oxbridge: 75, dofe: true, ccf: true, notable: "Top cricket school; outstanding all-round provision" },
  { id: 71, name: "Sevenoaks School", county: "Kent", town: "Sevenoaks", address: "High Street, Sevenoaks, Kent, TN13 1HU", lat: 51.2711, lng: 0.1868, type: "Co-ed", boarding: "Full/Day", ages: "11–18", ageMin: 11, ageMax: 18, termlyFee: 15790, annualFee: 47370, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.7, reviewCount: 221, url: "https://www.sevenoaksschool.org", founded: 1418, pupils: 1100, knownFor: [{ label: "IB (avg 38.5 — UK top)", category: "academic", icon: "🌍" }, { label: "International community", category: "pastoral", icon: "✈️" }, { label: "MUN & global citizenship", category: "academic", icon: "🗣️" }, { label: "Languages (7 offered)", category: "academic", icon: "🗺️" }, { label: "All-round scholarship awards", category: "academic", icon: "🎓" }], results: { gcse: { pct: 99, grades: "9-8: 68%" }, ibPct: 97, ibAvg: "38.5/45" }, sports: ["cricket","football","hockey","swimming","tennis","athletics","rowing"], academicFocus: ["sciences","languages","history","maths","economics"], arts: ["music","drama","art"], scholarships: ["academic","music","art","sport","all-rounder"], bursaries: true, oxbridge: 60, dofe: true, ccf: false, notable: "IB specialist; highly international community" },
  { id: 72, name: "Benenden School", county: "Kent", town: "Cranbrook", address: "Cranbrook, Kent, TN17 4AA", lat: 51.0914, lng: 0.5481, type: "Girls", boarding: "Full", ages: "11–18", ageMin: 11, ageMax: 18, termlyFee: 19830, annualFee: 59490, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.5, reviewCount: 132, url: "https://www.benenden.school", founded: 1923, pupils: 550, knownFor: [{ label: "Pastoral care (outstanding)", category: "pastoral", icon: "🤝" }, { label: "Lacrosse (national level)", category: "sport", icon: "🥍" }, { label: "Equestrian programme", category: "sport", icon: "🏇" }, { label: "Small boarding community", category: "pastoral", icon: "🏡" }, { label: "Princess Anne alumna", category: "pastoral", icon: "👑" }], results: { aLevel: { pct: 98, grades: "A*/A: 63%" }, gcse: { pct: 100, grades: "9-8: 57%" } }, sports: ["lacrosse","hockey","netball","swimming","tennis","athletics","equestrian"], academicFocus: ["sciences","english","history","languages","economics"], arts: ["music","drama","art"], scholarships: ["academic","music","art","sport","all-rounder"], bursaries: true, oxbridge: 58, dofe: true, ccf: false, notable: "Princess Anne alumna; outstanding pastoral care" },
  // ── HAMPSHIRE ────────────────────────────────────────────────────────────
  { id: 80, name: "Winchester College", county: "Hampshire", town: "Winchester", address: "College Street, Winchester, Hampshire, SO23 9NA", lat: 51.0591, lng: -1.3223, type: "Boys", boarding: "Full", ages: "13–18", ageMin: 13, ageMax: 18, termlyFee: 19600, annualFee: 58800, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.6, reviewCount: 234, url: "https://www.winchestercollege.org", founded: 1382, pupils: 700, knownFor: [{ label: "Philosophy & free thinking", category: "academic", icon: "🤔" }, { label: "Winchester Fives (unique)", category: "sport", icon: "🎾" }, { label: "Classics (strongest in UK)", category: "academic", icon: "📜" }, { label: "Maths (Olympiad record)", category: "academic", icon: "➕" }, { label: "Intellect over results culture", category: "academic", icon: "🧠" }], results: { aLevel: { pct: 100, grades: "A*/A: 86%" }, gcse: { pct: 100, grades: "9-8: 83%" } }, sports: ["cricket","football","swimming","tennis","athletics","fives","rowing"], academicFocus: ["classics","maths","sciences","history","economics","philosophy"], arts: ["music","drama","art"], scholarships: ["academic","music","art","sport"], bursaries: true, oxbridge: 88, dofe: true, ccf: true, notable: "One of England's oldest; unique intellectual traditions" },
  // ── WILTSHIRE ────────────────────────────────────────────────────────────
  { id: 85, name: "Marlborough College", county: "Wiltshire", town: "Marlborough", address: "The College, Marlborough, Wiltshire, SN8 1PA", lat: 51.4164, lng: -1.7282, type: "Co-ed", boarding: "Full/Day", ages: "13–18", ageMin: 13, ageMax: 18, termlyFee: 18720, annualFee: 56160, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.5, reviewCount: 176, url: "https://www.marlboroughcollege.org", founded: 1843, pupils: 960, knownFor: [{ label: "Polo & equestrian", category: "sport", icon: "🏇" }, { label: "Shooting (Bisley winners)", category: "sport", icon: "🎯" }, { label: "All-rounder scholarships", category: "academic", icon: "🌟" }, { label: "Social & pastoral reputation", category: "pastoral", icon: "🤝" }, { label: "Art (dedicated studios)", category: "arts", icon: "🎨" }], results: { aLevel: { pct: 98, grades: "A*/A: 66%" }, gcse: { pct: 99, grades: "9-8: 61%" } }, sports: ["cricket","hockey","swimming","rugby","polo","shooting","athletics","golf","tennis"], academicFocus: ["sciences","history","english","languages","economics"], arts: ["music","drama","art","DT"], scholarships: ["academic","music","art","sport","DT","all-rounder"], bursaries: true, oxbridge: 60, dofe: true, ccf: true, notable: "Kate Middleton alumna; stunning Wiltshire campus" },
  // ── GLOUCESTERSHIRE ──────────────────────────────────────────────────────
  { id: 90, name: "Cheltenham Ladies' College", county: "Gloucestershire", town: "Cheltenham", address: "Bayshill Road, Cheltenham, Gloucestershire, GL50 3EP", lat: 51.8996, lng: -2.078, type: "Girls", boarding: "Full/Day", ages: "11–18", ageMin: 11, ageMax: 18, termlyFee: 18430, annualFee: 55290, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.6, reviewCount: 189, url: "https://www.cheltladiescollege.org", founded: 1853, pupils: 920, knownFor: [{ label: "STEM for girls (UK leader)", category: "academic", icon: "🔬" }, { label: "Hockey (international players)", category: "sport", icon: "🏑" }, { label: "Lacrosse (national squad)", category: "sport", icon: "🥍" }, { label: "Pioneer of girls' education", category: "pastoral", icon: "🏛️" }, { label: "Languages & international outlook", category: "academic", icon: "🗺️" }], results: { aLevel: { pct: 99, grades: "A*/A: 73%" }, gcse: { pct: 100, grades: "9-8: 67%" } }, sports: ["swimming","hockey","lacrosse","netball","tennis","athletics","rowing"], academicFocus: ["sciences","maths","english","languages","history"], arts: ["music","drama","art"], scholarships: ["academic","music","art","sport","all-rounder"], bursaries: true, oxbridge: 70, dofe: true, ccf: false, notable: "Pioneer of girls' education; exceptional STEM" },
  // ── CAMBRIDGESHIRE ───────────────────────────────────────────────────────
  { id: 95, name: "The Perse School", county: "Cambridgeshire", town: "Cambridge", address: "Hills Road, Cambridge, Cambridgeshire, CB2 8QF", lat: 52.1964, lng: 0.1317, type: "Co-ed", boarding: "Day", ages: "7–18", ageMin: 7, ageMax: 18, termlyFee: 8250, annualFee: 24750, feeEstimated: true, isiBand: "Excellent", reviewScore: 4.7, reviewCount: 165, url: "https://www.perse.co.uk", founded: 1615, pupils: 1200, knownFor: [{ label: "Cambridge proximity (links)", category: "academic", icon: "🎓" }, { label: "Science Olympiad winners", category: "academic", icon: "🔬" }, { label: "Rowing on the Cam", category: "sport", icon: "🚣" }, { label: "Excellent value day school", category: "pastoral", icon: "💰" }, { label: "Rugby & team sports", category: "sport", icon: "🏉" }], results: { aLevel: { pct: 99, grades: "A*/A: 82%" }, gcse: { pct: 100, grades: "9-8: 78%" } }, sports: ["rowing","swimming","cricket","hockey","rugby","football","tennis","athletics"], academicFocus: ["sciences","maths","economics","history","languages"], arts: ["music","drama","art"], scholarships: ["academic","music","sport","art"], bursaries: true, oxbridge: 80, dofe: true, ccf: true, notable: "Top Cambridge day school; superb science facilities" },
];

const COUNTIES = [...new Set(SCHOOLS.map(s => s.county))].sort();

function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371, dLat = (lat2 - lat1) * Math.PI / 180, dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
const fmtFee = n => `£${n.toLocaleString()}`;

function matchSearch(school, query) {
  if (!query || query.trim().length < 2) return { matched: true, score: 0, reasons: [] };
  const q = query.toLowerCase().trim();
  const terms = q.split(/\s+/).filter(t => t.length > 1);
  const reasons = [];
  let score = 0;
  for (const term of terms) {
    if (school.name.toLowerCase().includes(term)) { score += 10; reasons.push(`name: ${school.name}`); continue; }
    if (school.town.toLowerCase().includes(term)) { score += 8; reasons.push(`town: ${school.town}`); continue; }
    if (school.county.toLowerCase().includes(term)) { score += 7; reasons.push(`county: ${school.county}`); continue; }
    const kfMatch = school.knownFor.find(k => k.label.toLowerCase().includes(term));
    if (kfMatch) { score += 6; reasons.push(`known for: ${kfMatch.label}`); continue; }
    if (school.sports.some(s => s.toLowerCase().includes(term))) { score += 5; reasons.push(`sport: ${school.sports.find(s => s.toLowerCase().includes(term))}`); continue; }
    if (school.academicFocus.some(a => a.toLowerCase().includes(term))) { score += 5; reasons.push(`subject: ${school.academicFocus.find(a => a.toLowerCase().includes(term))}`); continue; }
    if (school.scholarships.some(s => s.toLowerCase().includes(term))) { score += 4; reasons.push(`scholarship: ${term}`); continue; }
    if (school.notable.toLowerCase().includes(term)) { score += 3; reasons.push(`notable`); continue; }
    if (school.type.toLowerCase().includes(term)) { score += 3; reasons.push(`type: ${school.type}`); continue; }
    if (school.boarding.toLowerCase().includes(term)) { score += 3; reasons.push(`boarding`); continue; }
    if ((term.includes("edinburgh") || term === "doe" || term === "d.o.e") && school.dofe) { score += 4; reasons.push("Duke of Edinburgh"); continue; }
    if (term === "ccf" && school.ccf) { score += 4; reasons.push("CCF"); continue; }
    if (school.arts && school.arts.some(a => a.toLowerCase().includes(term))) { score += 4; reasons.push(`arts: ${school.arts.find(a => a.toLowerCase().includes(term))}`); continue; }
    if (String(school.founded).includes(term)) { score += 2; reasons.push(`founded: ${school.founded}`); continue; }
    return { matched: false, score: 0, reasons: [] };
  }
  return { matched: score > 0, score, reasons: [...new Set(reasons)] };
}

const inputStyle = { width: "100%", padding: "8px 11px", border: "1px solid #d4c9b0", borderRadius: 4, fontSize: 13, fontFamily: "'Source Sans 3', sans-serif", background: "#faf8f4", boxSizing: "border-box", color: "#1a1a1a", outline: "none" };
const labelStyle = { display: "block", fontSize: 10, fontWeight: 700, color: "#888", fontFamily: "'Source Sans 3', sans-serif", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 5 };
const CAT_STYLE = {
  academic: { bg: "#e8f4fd", text: "#1a3a5c", border: "#bdd9f0" },
  sport:    { bg: "#eafaf1", text: "#145a32", border: "#a9dfbf" },
  arts:     { bg: "#fdf2fb", text: "#6c3483", border: "#d7bde2" },
  pastoral: { bg: "#fef9e7", text: "#7d6000", border: "#f9e79f" },
};

function KnownForChips({ items, highlightTerms = [] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
      {items.map((item, i) => {
        const style = CAT_STYLE[item.category] || CAT_STYLE.academic;
        const q = highlightTerms.join(" ").toLowerCase();
        const isHit = q && item.label.toLowerCase().split(" ").some(w => w.length > 2 && q.includes(w.replace(/[^a-z]/g, "")));
        return (
          <span key={i} style={{ background: isHit ? "#fff3cd" : style.bg, color: isHit ? "#7d5a00" : style.text, border: `1px solid ${isHit ? "#f0c040" : style.border}`, fontSize: 11, padding: "3px 9px", borderRadius: 20, fontFamily: "'Source Sans 3', sans-serif", fontWeight: isHit ? 700 : 400 }}>
            {item.icon} {item.label}
          </span>
        );
      })}
    </div>
  );
}

function StarRow({ score, count }) {
  const full = Math.floor(score);
  return (
    <span style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
      {[...Array(5)].map((_, i) => <span key={i} style={{ color: i < full ? "#c7a42f" : "#ddd", fontSize: 14 }}>{i < full ? "★" : "☆"}</span>)}
      <span style={{ color: "#888", fontSize: 12, marginLeft: 4 }}>{score}/5 · {count}</span>
    </span>
  );
}

function Bar({ pct, color }) {
  return (
    <div style={{ height: 7, background: "#e8e4dc", borderRadius: 4, overflow: "hidden", marginTop: 3 }}>
      <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 4, transition: "width 0.6s" }} />
    </div>
  );
}
function SHead({ children }) {
  return <h4 style={{ margin: "0 0 8px", fontSize: 10, fontWeight: 700, color: "#888", fontFamily: "'Source Sans 3', sans-serif", letterSpacing: 1.5, textTransform: "uppercase" }}>{children}</h4>;
}

function AddressSearch({ onSelect, onClear, hasLocation }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const debRef = useRef(null), containerRef = useRef(null);
  async function search(val) {
    if (val.length < 2) { setSuggestions([]); return; }
    setLoading(true);
    try {
      const pc = val.replace(/\s/g, "").toUpperCase();
      const res = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(pc)}/autocomplete`);
      const data = await res.json();
      if (data.result?.length > 0) {
        const bulk = await fetch("https://api.postcodes.io/postcodes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ postcodes: data.result.slice(0, 8) }) });
        const bd = await bulk.json();
        const r = (bd.result || []).filter(r => r.result).map(r => ({ label: `${r.result.postcode} – ${r.result.admin_ward || ""}, ${r.result.admin_district || ""}`, postcode: r.result.postcode, lat: r.result.latitude, lng: r.result.longitude }));
        setSuggestions(r); setOpen(r.length > 0);
      } else { setSuggestions([]); setOpen(false); }
    } catch { setSuggestions([]); }
    setLoading(false);
  }
  useEffect(() => {
    const fn = e => { if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);
  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <div style={{ display: "flex", gap: 6 }}>
        <div style={{ position: "relative", flex: 1 }}>
          <input value={query} onChange={e => { setQuery(e.target.value); clearTimeout(debRef.current); if (!e.target.value) { onClear(); setSuggestions([]); setOpen(false); return; } debRef.current = setTimeout(() => search(e.target.value), 320); }} onFocus={() => suggestions.length > 0 && setOpen(true)} placeholder="Type postcode or area…" style={inputStyle} />
          {loading && <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", fontSize: 11, color: "#aaa" }}>⟳</span>}
        </div>
        {hasLocation && <button onClick={() => { setQuery(""); onClear(); setSuggestions([]); setOpen(false); }} style={{ padding: "8px 10px", background: "#f0ece4", border: "1px solid #d4c9b0", borderRadius: 4, cursor: "pointer", fontSize: 12, color: "#666", fontFamily: "'Source Sans 3', sans-serif" }}>✕</button>}
      </div>
      {open && suggestions.length > 0 && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#fff", border: "1px solid #d4c9b0", borderRadius: 4, zIndex: 999, boxShadow: "0 4px 16px rgba(0,0,0,0.12)", maxHeight: 200, overflowY: "auto" }}>
          {suggestions.map((s, i) => (
            <div key={i} onClick={() => { setQuery(s.postcode); setSuggestions([]); setOpen(false); onSelect({ lat: s.lat, lng: s.lng, label: s.postcode }); }}
              onMouseEnter={e => e.currentTarget.style.background = "#faf8f4"} onMouseLeave={e => e.currentTarget.style.background = "#fff"}
              style={{ padding: "9px 13px", cursor: "pointer", fontSize: 13, fontFamily: "'Source Sans 3', sans-serif", borderBottom: "1px solid #f0ece4" }}>
              <strong>{s.postcode}</strong> <span style={{ color: "#888" }}>{s.label.split("–")[1]}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SchoolMap({ schools, userCoords, onSelect, matchedIds }) {
  const mapRef = useRef(null), instanceRef = useRef(null), markersRef = useRef([]), userRef = useRef(null);
  function renderMarkers(map) {
    if (!map || !window.L) return;
    markersRef.current.forEach(m => m.remove()); markersRef.current = [];
    schools.forEach(s => {
      const isMatch = matchedIds?.includes(s.id);
      const color = s.type === "Boys" ? "#1a3a5c" : s.type === "Girls" ? "#6c3483" : "#145a32";
      const sz = isMatch ? 34 : 26;
      const icon = window.L.divIcon({ className: "", html: `<div style="background:${isMatch ? "#c7a42f" : color};color:#fff;border-radius:50%;width:${sz}px;height:${sz}px;display:flex;align-items:center;justify-content:center;font-size:${isMatch ? 14 : 10}px;font-weight:700;border:${isMatch ? "3px" : "2px"} solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3);cursor:pointer;font-family:sans-serif;">${isMatch ? "★" : s.type[0]}</div>`, iconSize: [sz, sz], iconAnchor: [sz / 2, sz / 2] });
      const marker = window.L.marker([s.lat, s.lng], { icon }).addTo(map)
        .bindPopup(`<div style="font-family:sans-serif;min-width:190px;"><strong>${s.name}</strong>${isMatch ? ' <span style="color:#c7a42f">★</span>' : ""}<br/><span style="color:#666;font-size:12px">${s.address}</span><br/><div style="margin-top:5px;font-size:12px;">${s.type} · Ages ${s.ages} · ${fmtFee(s.annualFee)}/yr</div><a href="${s.url}" target="_blank" style="color:#1c2b1e;font-size:12px;display:block;margin-top:5px;">Visit →</a></div>`);
      marker.on("click", () => onSelect(s.id));
      markersRef.current.push(marker);
    });
    if (userCoords) {
      if (userRef.current) userRef.current.remove();
      userRef.current = window.L.marker([userCoords.lat, userCoords.lng], { icon: window.L.divIcon({ className: "", html: `<div style="background:#c0392b;color:#fff;border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;font-size:16px;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.4);">📍</div>`, iconSize: [30, 30], iconAnchor: [15, 15] }) }).addTo(map).bindPopup("<strong>Your location</strong>");
    }
    if (schools.length > 0) {
      try { const b = window.L.latLngBounds(schools.map(s => [s.lat, s.lng])); if (userCoords) b.extend([userCoords.lat, userCoords.lng]); map.fitBounds(b, { padding: [30, 30], maxZoom: 11 }); } catch {}
    }
  }
  useEffect(() => {
    if (!document.getElementById("leaflet-css")) { const l = document.createElement("link"); l.id = "leaflet-css"; l.rel = "stylesheet"; l.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"; document.head.appendChild(l); }
    const init = () => {
      if (instanceRef.current || !mapRef.current || !window.L) return;
      const center = userCoords ? [userCoords.lat, userCoords.lng] : [52.5, -1.5];
      const map = window.L.map(mapRef.current, { zoomControl: true }).setView(center, userCoords ? 8 : 6);
      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "© OpenStreetMap" }).addTo(map);
      instanceRef.current = map; renderMarkers(map);
    };
    if (!window.L) { const s = document.createElement("script"); s.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"; s.onload = () => setTimeout(init, 50); document.head.appendChild(s); } else { setTimeout(init, 50); }
  }, []);
  useEffect(() => { if (instanceRef.current && window.L) renderMarkers(instanceRef.current); }, [schools, userCoords, matchedIds]);
  return <div ref={mapRef} style={{ width: "100%", height: "100%", borderRadius: 8 }} />;
}

function ChildAdvisor({ schools, onMatches, apiKey }) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({ name: "", age: "", gender: "", currentSchool: "", sports: [], subjects: [], otherInterests: "", academicLevel: "", boardingPref: "", maxFee: "", notes: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [tab, setTab] = useState("matches");
  const [errorMsg, setErrorMsg] = useState(null);
  const toggleArr = (field, val) => setProfile(p => ({ ...p, [field]: p[field].includes(val) ? p[field].filter(x => x !== val) : [...p[field], val] }));
  const SPORTS_OPTIONS = ["swimming","cricket","rugby","football","hockey","rowing","tennis","athletics","polo","golf","shooting","lacrosse","netball","fencing","equestrian","gymnastics","basketball"];
  const SUBJECT_OPTIONS = ["maths","sciences","history","english","classics","languages","economics","politics","art","DT","music","drama","philosophy","IB"];

  async function runAnalysis() {
    setLoading(true); setResult(null); setRoadmap(null); setErrorMsg(null);
    const summaries = schools.map(s => ({ id: s.id, name: s.name, county: s.county, type: s.type, ages: s.ages, ageMin: s.ageMin, ageMax: s.ageMax, annualFee: s.annualFee, sports: s.sports, academicFocus: s.academicFocus, knownFor: s.knownFor.map(k => k.label), scholarships: s.scholarships, bursaries: s.bursaries, oxbridge: s.oxbridge, aLevelPct: s.results?.aLevel?.pct, ibPct: s.results?.ibPct, boarding: s.boarding, dofe: s.dofe, ccf: s.ccf }));
    const prompt = `You are a UK independent school admissions expert. Match this child to schools and build a personalised action roadmap.

CHILD: Name: ${profile.name||"not given"}, Age: ${profile.age}, Gender: ${profile.gender}, Current school: ${profile.currentSchool||"not given"}, Sports: ${profile.sports.join(", ")||"none"}, Subjects: ${profile.subjects.join(", ")||"none"}, Other interests: ${profile.otherInterests||"none"}, Academic level: ${profile.academicLevel}, Boarding: ${profile.boardingPref}, Max fee: ${profile.maxFee?"£"+profile.maxFee:"no limit"}, Notes: ${profile.notes||"none"}

SCHOOLS: ${JSON.stringify(summaries)}

Respond ONLY with valid JSON, no markdown:
{"topMatches":[{"schoolId":<n>,"matchScore":<1-100>,"headline":"<15 words>","reasons":["<r1>","<r2>","<r3>"],"watchouts":["<concern>"],"scholarshipOpportunity":"<specific>"}],"summary":"<2-3 sentences>","roadmap":{"immediate":[{"action":"<title>","detail":"<detail>","timeline":"<when>"}],"shortTerm":[{"action":"<title>","detail":"<detail>","timeline":"<when>"}],"longTerm":[{"action":"<title>","detail":"<detail>","timeline":"<when>"}],"scholarshipPlan":[{"type":"<type>","whatToDoNow":"<steps>","keyDates":"<timing>"}],"extracurricular":[{"activity":"<e.g. Duke of Edinburgh>","whyItHelps":"<reason>","whenToStart":"<age/year>"}]}}

Include exactly 5 top matches. Be specific and practical.`;
    try {
      const headers = { "Content-Type": "application/json" };
      // Outside claude.ai, calls go directly to the Anthropic API with a user-supplied key.
      if (apiKey) {
        headers["x-api-key"] = apiKey;
        headers["anthropic-version"] = "2023-06-01";
        headers["anthropic-dangerous-direct-browser-access"] = "true";
      }
      const res = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers, body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 3000, messages: [{ role: "user", content: prompt }] }) });
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody?.error?.message || `Request failed (${res.status})`);
      }
      const data = await res.json();
      const text = data.content?.map(c => c.text || "").join("") || "";
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      setResult(parsed); setRoadmap(parsed.roadmap);
      onMatches(parsed.topMatches.map(m => m.schoolId)); setStep(3);
    } catch (e) {
      console.error(e);
      setErrorMsg(apiKey ? `Analysis failed: ${e.message}` : "Analysis failed. If you're running this outside claude.ai, add your Anthropic API key in Settings (top right) first.");
    }
    setLoading(false);
  }

  return (
    <div style={{ background: "#fff", border: "1.5px solid #c7a42f", borderRadius: 10, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.1)" }}>
      <div style={{ background: "linear-gradient(135deg, #1c2b1e 0%, #2d4a32 100%)", padding: "18px 22px", color: "#e8dfc8" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 24 }}>✦</span>
          <div><h2 style={{ margin: 0, fontSize: 19, fontWeight: 600, fontFamily: "'Fraunces', serif" }}>School Matching Advisor</h2><p style={{ margin: 0, fontSize: 12, color: "#a09070", fontFamily: "'Source Sans 3', sans-serif" }}>Tell us about your child — we'll find their perfect schools & build a roadmap</p></div>
        </div>
        {step < 3 && (
          <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
            {["About your child","Sports & interests","Preferences"].map((s, i) => (
              <div key={i} style={{ flex: 1 }}>
                <div style={{ height: 3, background: i <= step ? "#c7a42f" : "rgba(255,255,255,0.2)", borderRadius: 2, transition: "background 0.3s" }} />
                <div style={{ fontSize: 10, color: i === step ? "#c7a42f" : "rgba(255,255,255,0.4)", fontFamily: "'Source Sans 3', sans-serif", marginTop: 4 }}>{s}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ padding: "22px" }}>
        {step === 0 && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div><label style={labelStyle}>Child's name</label><input value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Oliver" style={inputStyle} /></div>
              <div><label style={labelStyle}>Age now</label><input type="number" min={3} max={17} value={profile.age} onChange={e => setProfile(p => ({ ...p, age: e.target.value }))} placeholder="e.g. 8" style={inputStyle} /></div>
              <div><label style={labelStyle}>Gender</label><select value={profile.gender} onChange={e => setProfile(p => ({ ...p, gender: e.target.value }))} style={inputStyle}><option value="">Select…</option><option>Boy</option><option>Girl</option><option>Either</option></select></div>
              <div><label style={labelStyle}>Academic level</label><select value={profile.academicLevel} onChange={e => setProfile(p => ({ ...p, academicLevel: e.target.value }))} style={inputStyle}><option value="">Select…</option><option>Very high (scholarship potential)</option><option>Above average</option><option>Average for age</option><option>Needs some support</option></select></div>
              <div style={{ gridColumn: "span 2" }}><label style={labelStyle}>Current school (optional)</label><input value={profile.currentSchool} onChange={e => setProfile(p => ({ ...p, currentSchool: e.target.value }))} placeholder="e.g. St Piran's, Maidenhead" style={inputStyle} /></div>
            </div>
            <button onClick={() => setStep(1)} disabled={!profile.age || !profile.gender || !profile.academicLevel} style={{ marginTop: 18, width: "100%", padding: "11px", background: !profile.age || !profile.gender || !profile.academicLevel ? "#ccc" : "#1c2b1e", color: "#e8dfc8", border: "none", borderRadius: 5, fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Next: Interests →</button>
          </div>
        )}
        {step === 1 && (
          <div>
            <p style={{ margin: "0 0 14px", fontSize: 13, color: "#555", fontFamily: "'Source Sans 3', sans-serif" }}>Select all that apply — this drives sport, scholarship and academic matching.</p>
            <label style={labelStyle}>Sports & physical activities</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 18 }}>{SPORTS_OPTIONS.map(s => (<button key={s} onClick={() => toggleArr("sports", s)} style={{ padding: "5px 12px", background: profile.sports.includes(s) ? "#1c2b1e" : "#f4f1ea", color: profile.sports.includes(s) ? "#e8dfc8" : "#444", border: `1.5px solid ${profile.sports.includes(s) ? "#1c2b1e" : "#d4c9b0"}`, borderRadius: 20, fontSize: 12, fontFamily: "'Source Sans 3', sans-serif", cursor: "pointer", textTransform: "capitalize" }}>{s}</button>))}</div>
            <label style={labelStyle}>Favourite subjects / strengths</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 18 }}>{SUBJECT_OPTIONS.map(s => (<button key={s} onClick={() => toggleArr("subjects", s)} style={{ padding: "5px 12px", background: profile.subjects.includes(s) ? "#6c3483" : "#f4f1ea", color: profile.subjects.includes(s) ? "#fff" : "#444", border: `1.5px solid ${profile.subjects.includes(s) ? "#6c3483" : "#d4c9b0"}`, borderRadius: 20, fontSize: 12, fontFamily: "'Source Sans 3', sans-serif", cursor: "pointer", textTransform: "capitalize" }}>{s}</button>))}</div>
            <div><label style={labelStyle}>Other interests</label><input value={profile.otherInterests} onChange={e => setProfile(p => ({ ...p, otherInterests: e.target.value }))} placeholder="e.g. Grade 5 piano, coding, debating, art…" style={inputStyle} /></div>
            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              <button onClick={() => setStep(0)} style={{ flex: 1, padding: "10px", background: "#f4f1ea", border: "1px solid #d4c9b0", borderRadius: 5, fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, cursor: "pointer", color: "#444" }}>← Back</button>
              <button onClick={() => setStep(2)} style={{ flex: 3, padding: "10px", background: "#1c2b1e", color: "#e8dfc8", border: "none", borderRadius: 5, fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Next: Preferences →</button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div><label style={labelStyle}>Boarding preference</label><select value={profile.boardingPref} onChange={e => setProfile(p => ({ ...p, boardingPref: e.target.value }))} style={inputStyle}><option value="">Any</option><option>Day school only</option><option>Weekly boarding</option><option>Full boarding fine</option><option>Boarding preferred</option></select></div>
              <div><label style={labelStyle}>Max annual fee (£)</label><select value={profile.maxFee} onChange={e => setProfile(p => ({ ...p, maxFee: e.target.value }))} style={inputStyle}><option value="">No limit</option><option value="20000">£20,000</option><option value="25000">£25,000</option><option value="30000">£30,000</option><option value="40000">£40,000</option><option value="50000">£50,000+</option></select></div>
              <div style={{ gridColumn: "span 2" }}><label style={labelStyle}>Anything else?</label><textarea value={profile.notes} onChange={e => setProfile(p => ({ ...p, notes: e.target.value }))} placeholder="e.g. Looking for swimming scholarship, CCF, sibling at school, IB preferred…" rows={3} style={{ ...inputStyle, resize: "vertical" }} /></div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, padding: "10px", background: "#f4f1ea", border: "1px solid #d4c9b0", borderRadius: 5, fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, cursor: "pointer", color: "#444" }}>← Back</button>
              <button onClick={runAnalysis} disabled={loading} style={{ flex: 3, padding: "10px", background: loading ? "#888" : "#c7a42f", color: "#1c2b1e", border: "none", borderRadius: 5, fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: 700, cursor: loading ? "wait" : "pointer" }}>{loading ? "✦ Analysing…" : "✦ Find matching schools"}</button>
            </div>
            {errorMsg && <div style={{ marginTop: 12, background: "#fdecea", border: "1px solid #f0b8b0", borderRadius: 5, padding: "9px 12px", fontSize: 12, fontFamily: "'Source Sans 3', sans-serif", color: "#8b2c1f" }}>⚠ {errorMsg}</div>}
          </div>
        )}
        {step === 3 && result && (
          <div>
            <div style={{ background: "#f4f1ea", borderRadius: 8, padding: "14px 16px", marginBottom: 18, borderLeft: "3px solid #c7a42f" }}>
              <p style={{ margin: 0, fontSize: 14, fontFamily: "'Source Sans 3', sans-serif", color: "#333", lineHeight: 1.6 }}><strong>✦ {result.summary}</strong></p>
            </div>
            <div style={{ display: "flex", gap: 0, marginBottom: 18, borderBottom: "2px solid #e8e4dc" }}>
              {[["matches","🏫 Top Matches"],["roadmap","🗺 Action Roadmap"],["scholarships","🎓 Scholarship Plan"]].map(([t,l]) => (
                <button key={t} onClick={() => setTab(t)} style={{ padding: "8px 16px", background: "none", border: "none", borderBottom: tab === t ? "2px solid #1c2b1e" : "none", marginBottom: -2, fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: tab === t ? 700 : 400, color: tab === t ? "#1c2b1e" : "#888", cursor: "pointer" }}>{l}</button>
              ))}
            </div>
            {tab === "matches" && (
              <div style={{ display: "grid", gap: 12 }}>
                {result.topMatches.map((m, i) => {
                  const school = schools.find(s => s.id === m.schoolId); if (!school) return null;
                  const typeColor = { Boys: "#1a3a5c", Girls: "#6c3483", "Co-ed": "#145a32" }[school.type];
                  return (
                    <div key={m.schoolId} style={{ border: `1.5px solid ${i === 0 ? "#c7a42f" : "#e8e4dc"}`, borderRadius: 8, overflow: "hidden", background: i === 0 ? "#fffbf0" : "#fff" }}>
                      <div style={{ padding: "12px 16px", display: "flex", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
                        <div style={{ background: "#c7a42f", color: "#1c2b1e", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, fontFamily: "'Source Sans 3', sans-serif", flexShrink: 0 }}>{i + 1}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                            <strong style={{ fontSize: 16, fontFamily: "'Fraunces', serif", fontWeight: 600 }}>{school.name}</strong>
                            <span style={{ background: typeColor, color: "#fff", fontSize: 10, padding: "2px 8px", borderRadius: 20, fontFamily: "'Source Sans 3', sans-serif" }}>{school.type}</span>
                            <span style={{ background: "#f4f1ea", fontSize: 10, padding: "2px 8px", borderRadius: 20, fontFamily: "'Source Sans 3', sans-serif", color: "#666" }}>Ages {school.ages}</span>
                          </div>
                          <p style={{ margin: "4px 0 0", fontSize: 12, color: "#666", fontFamily: "'Source Sans 3', sans-serif" }}>📍 {school.town}, {school.county} · {fmtFee(school.annualFee)}/yr</p>
                          <p style={{ margin: "6px 0 0", fontSize: 13, fontFamily: "'Source Sans 3', sans-serif", fontStyle: "italic", color: "#7d5a00" }}>"{m.headline}"</p>
                        </div>
                        <div style={{ textAlign: "center", background: "#1c2b1e", borderRadius: 8, padding: "8px 12px", color: "#e8dfc8", minWidth: 56 }}>
                          <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Source Sans 3', sans-serif" }}>{m.matchScore}</div>
                          <div style={{ fontSize: 9, fontFamily: "'Source Sans 3', sans-serif", letterSpacing: 0.5 }}>MATCH</div>
                        </div>
                      </div>
                      <div style={{ padding: "0 16px 14px 60px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                          <div>
                            <div style={{ fontSize: 10, fontWeight: 700, color: "#145a32", fontFamily: "'Source Sans 3', sans-serif", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Why it fits</div>
                            {m.reasons.map((r, j) => <p key={j} style={{ margin: "0 0 4px", fontSize: 12, fontFamily: "'Source Sans 3', sans-serif", color: "#444" }}>✓ {r}</p>)}
                          </div>
                          <div>
                            {m.watchouts?.length > 0 && m.watchouts[0] && (<><div style={{ fontSize: 10, fontWeight: 700, color: "#8b5e00", fontFamily: "'Source Sans 3', sans-serif", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>To consider</div>{m.watchouts.map((w, j) => <p key={j} style={{ margin: "0 0 4px", fontSize: 12, fontFamily: "'Source Sans 3', sans-serif", color: "#666" }}>⚠ {w}</p>)}</>)}
                            {m.scholarshipOpportunity && (<div style={{ background: "#eafaf1", borderRadius: 5, padding: "7px 10px", marginTop: 6, fontSize: 12, fontFamily: "'Source Sans 3', sans-serif", color: "#145a32" }}>🎓 <strong>Scholarship:</strong> {m.scholarshipOpportunity}</div>)}
                          </div>
                        </div>
                        <a href={school.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: 10, fontSize: 12, fontFamily: "'Source Sans 3', sans-serif", color: "#1c2b1e", fontWeight: 600, textDecoration: "none" }}>Visit {school.name} →</a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {tab === "roadmap" && roadmap && (
              <div style={{ display: "grid", gap: 20 }}>
                {[{ key: "immediate", label: "Do Now", color: "#c0392b", icon: "⚡", items: roadmap.immediate }, { key: "shortTerm", label: "Next 6–18 Months", color: "#e67e22", icon: "📅", items: roadmap.shortTerm }, { key: "longTerm", label: "Long-Term Plan", color: "#1c2b1e", icon: "🎯", items: roadmap.longTerm }].map(section => (
                  <div key={section.key}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                      <span style={{ fontSize: 18 }}>{section.icon}</span>
                      <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: section.color, fontFamily: "'Source Sans 3', sans-serif", textTransform: "uppercase", letterSpacing: 1 }}>{section.label}</h3>
                      <div style={{ flex: 1, height: 1, background: "#e8e4dc" }} />
                    </div>
                    <div style={{ display: "grid", gap: 8 }}>
                      {(section.items || []).map((item, i) => (
                        <div key={i} style={{ background: "#faf8f4", border: "1px solid #e8e4dc", borderRadius: 7, padding: "12px 14px", borderLeft: `3px solid ${section.color}` }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, flexWrap: "wrap" }}>
                            <strong style={{ fontSize: 13, fontFamily: "'Source Sans 3', sans-serif", color: "#1a1a1a" }}>{item.action}</strong>
                            <span style={{ background: section.color, color: "#fff", fontSize: 10, padding: "2px 8px", borderRadius: 20, fontFamily: "'Source Sans 3', sans-serif", whiteSpace: "nowrap" }}>{item.timeline}</span>
                          </div>
                          <p style={{ margin: "5px 0 0", fontSize: 12, fontFamily: "'Source Sans 3', sans-serif", color: "#555", lineHeight: 1.6 }}>{item.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {roadmap.extracurricular?.length > 0 && (
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}><span style={{ fontSize: 18 }}>🏅</span><h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#6c3483", fontFamily: "'Source Sans 3', sans-serif", textTransform: "uppercase", letterSpacing: 1 }}>Extracurricular Building Blocks</h3><div style={{ flex: 1, height: 1, background: "#e8e4dc" }} /></div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8 }}>
                      {roadmap.extracurricular.map((e, i) => (
                        <div key={i} style={{ background: "#faf0ff", border: "1px solid #e0c8f0", borderRadius: 7, padding: "12px 14px" }}>
                          <strong style={{ fontSize: 13, fontFamily: "'Source Sans 3', sans-serif", color: "#6c3483" }}>{e.activity}</strong>
                          <p style={{ margin: "4px 0 2px", fontSize: 12, fontFamily: "'Source Sans 3', sans-serif", color: "#555" }}>{e.whyItHelps}</p>
                          <span style={{ fontSize: 11, fontFamily: "'Source Sans 3', sans-serif", color: "#888" }}>Start: {e.whenToStart}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            {tab === "scholarships" && roadmap?.scholarshipPlan && (
              <div>
                <div style={{ background: "#fffbf0", border: "1px solid #c7a42f", borderRadius: 8, padding: "14px 16px", marginBottom: 16 }}>
                  <p style={{ margin: 0, fontSize: 13, fontFamily: "'Source Sans 3', sans-serif", color: "#7d5a00" }}>🎓 Scholarships recognise excellence; bursaries provide financial support. Schools look for <strong>consistent, evidenced achievement</strong> — start early.</p>
                </div>
                <div style={{ display: "grid", gap: 12 }}>
                  {roadmap.scholarshipPlan.map((s, i) => (
                    <div key={i} style={{ border: "1.5px solid #e8e4dc", borderRadius: 8, overflow: "hidden" }}>
                      <div style={{ background: "#1c2b1e", padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <strong style={{ color: "#e8dfc8", fontFamily: "'Source Sans 3', sans-serif", fontSize: 14 }}>🎓 {s.type}</strong>
                        <span style={{ background: "#c7a42f", color: "#1c2b1e", fontSize: 11, padding: "2px 10px", borderRadius: 20, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 700 }}>{s.keyDates}</span>
                      </div>
                      <div style={{ padding: "12px 16px", background: "#faf8f4" }}>
                        <p style={{ margin: 0, fontSize: 13, fontFamily: "'Source Sans 3', sans-serif", color: "#333", lineHeight: 1.7 }}>{s.whatToDoNow}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <button onClick={() => { setStep(0); setResult(null); setRoadmap(null); onMatches([]); }} style={{ marginTop: 20, padding: "9px 18px", background: "#f4f1ea", border: "1px solid #d4c9b0", borderRadius: 5, fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, cursor: "pointer", color: "#444" }}>← Start again</button>
          </div>
        )}
      </div>
    </div>
  );
}

function SchoolCard({ school: s, selected, onSelect, hasUserCoords, isMatch, searchTerms, shortlisted, onToggleShortlist, shortlistFull }) {
  const typeColor = { Boys: "#1a3a5c", Girls: "#6c3483", "Co-ed": "#145a32" }[s.type];
  const typeText  = { Boys: "#aed6f1", Girls: "#d7bde2", "Co-ed": "#a9dfbf" }[s.type];
  const r = s.results;
  return (
    <div style={{ background: "#fff", border: `1.5px solid ${isMatch ? "#c7a42f" : selected ? "#1c2b1e" : "#d4c9b0"}`, borderRadius: 8, overflow: "hidden", boxShadow: isMatch ? "0 4px 16px rgba(199,164,47,0.2)" : "0 1px 3px rgba(0,0,0,0.05)", transition: "all 0.2s", cursor: "pointer" }} onClick={onSelect}>
      {isMatch && <div style={{ background: "#c7a42f", padding: "4px 16px", fontSize: 11, fontFamily: "'Source Sans 3', sans-serif", color: "#1c2b1e", fontWeight: 700 }}>★ AI Recommended Match</div>}
      <div style={{ padding: "14px 18px 8px", display: "flex", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
        <button
          onClick={e => { e.stopPropagation(); onToggleShortlist(s.id); }}
          disabled={!shortlisted && shortlistFull}
          title={shortlisted ? "Remove from shortlist" : shortlistFull ? "Shortlist full (max 4) — remove one to add another" : "Add to shortlist"}
          style={{ flexShrink: 0, width: 30, height: 30, borderRadius: "50%", border: `1.5px solid ${shortlisted ? "#c7a42f" : "#d4c9b0"}`, background: shortlisted ? "#fff8e6" : "#fff", color: shortlisted ? "#c7a42f" : (!shortlisted && shortlistFull) ? "#ddd" : "#bbb", fontSize: 15, cursor: (!shortlisted && shortlistFull) ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
          {shortlisted ? "★" : "☆"}
        </button>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 2 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "#1a1a1a", fontFamily: "'Fraunces', serif" }}>{s.name}</h3>
            <span style={{ background: typeColor, color: typeText, fontSize: 10, padding: "2px 8px", borderRadius: 20, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600 }}>{s.type}</span>
          </div>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: "#777", fontFamily: "'Source Sans 3', sans-serif" }}>
            📍 {s.address}
            {hasUserCoords && s._distance != null && <span style={{ color: "#1c2b1e", fontWeight: 600, marginLeft: 8 }}>· {(s._distance / 1.60934).toFixed(1)} mi</span>}
          </p>
        </div>
        <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, justifyContent: "flex-end" }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#1c2b1e", fontFamily: "'Source Sans 3', sans-serif" }}>{fmtFee(s.annualFee)}</div>
              {s.feeVerified && <span title="Verified against the school's published fee schedule" style={{ width: 15, height: 15, borderRadius: "50%", background: "#1c2b1e", color: "#c7a42f", fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✓</span>}
            </div>
            <div style={{ fontSize: 10, color: s.feeVerified ? "#145a32" : "#aa8800", fontFamily: "'Source Sans 3', sans-serif" }}>per year{s.feeVerified ? " · verified" : " · est."}</div>
          </div>
          {r?.aLevel && <div style={{ textAlign: "center", background: "#eafaf1", borderRadius: 6, padding: "4px 9px" }}><div style={{ fontSize: 15, fontWeight: 700, color: "#145a32", fontFamily: "'Source Sans 3', sans-serif" }}>{r.aLevel.pct}%</div><div style={{ fontSize: 9, color: "#555", fontFamily: "'Source Sans 3', sans-serif" }}>A-level</div></div>}
          <span style={{ fontSize: 16, color: selected ? "#1c2b1e" : "#ccc" }}>{selected ? "▲" : "▼"}</span>
        </div>
      </div>
      <div style={{ padding: "6px 18px 10px" }}>
        <KnownForChips items={s.knownFor} highlightTerms={searchTerms} />
      </div>
      <div style={{ padding: "0 18px 10px", display: "flex", gap: 5, flexWrap: "wrap" }}>
        {[
          { label: `Ages ${s.ages}` }, { label: s.boarding }, { label: `Est. ${s.founded}` },
          { label: `${s.pupils} pupils` }, { label: `ISI: ${s.isiBand}`, green: s.isiBand === "Excellent" },
          s.dofe && { label: "D of E" }, s.ccf && { label: "CCF" },
        ].filter(Boolean).map((c, i) => (
          <span key={i} style={{ background: c.green ? "#eafaf1" : "#f4f1ea", fontSize: 11, padding: "2px 8px", borderRadius: 20, fontFamily: "'Source Sans 3', sans-serif", color: c.green ? "#145a32" : "#555" }}>{c.label}</span>
        ))}
      </div>
      {selected && (
        <div style={{ borderTop: "1px solid #ede8dc", background: "#faf8f4", padding: "16px 18px" }} onClick={e => e.stopPropagation()}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 18 }}>
            <div>
              <SHead>Location</SHead>
              <p style={{ fontSize: 13, fontFamily: "'Source Sans 3', sans-serif", color: "#444", margin: "0 0 8px", lineHeight: 1.6 }}>{s.address}</p>
              <a href={`https://www.google.com/maps/search/${encodeURIComponent(s.name+" "+s.address)}`} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: "#1c2b1e", fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600, textDecoration: "none", background: "#e8dfc8", padding: "5px 10px", borderRadius: 4 }}>🗺 Google Maps</a>
            </div>
            <div>
              <SHead>Fees</SHead>
              <table style={{ width: "100%", fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, borderCollapse: "collapse" }}>
                <tbody>
                  {[["Per term", fmtFee(s.termlyFee)], ["Per year (day)", fmtFee(s.annualFee)], ["Boarding", "Contact school"]].map(([l, v]) => (
                    <tr key={l} style={{ borderBottom: "1px solid #ede8dc" }}><td style={{ padding: "4px 0", color: "#888" }}>{l}</td><td style={{ padding: "4px 0", fontWeight: 600 }}>{v}</td></tr>
                  ))}
                </tbody>
              </table>
              <div style={{ marginTop: 8, fontSize: 11, fontFamily: "'Source Sans 3', sans-serif", lineHeight: 1.5, color: s.feeVerified ? "#145a32" : "#8b6500", background: s.feeVerified ? "#eafaf1" : "#fff8e6", border: `1px solid ${s.feeVerified ? "#a9dfbf" : "#f0d878"}`, borderRadius: 5, padding: "6px 9px" }}>
                {s.feeVerified ? "✓ Verified against the school's published fee schedule." : "⚠ Estimated post-VAT figure, not yet confirmed against the school's current fee schedule."}
                {s.feeNote && <div style={{ marginTop: 3 }}>{s.feeNote}</div>}
              </div>
            </div>
            <div>
              <SHead>Exam Results</SHead>
              {r?.aLevel && (<><p style={{ margin: "0 0 2px", fontSize: 11, fontFamily: "'Source Sans 3', sans-serif", color: "#666" }}>A-Level pass rate</p><Bar pct={r.aLevel.pct} color="#145a32" /><p style={{ fontSize: 11, fontFamily: "'Source Sans 3', sans-serif", color: "#555", margin: "3px 0 8px" }}>{r.aLevel.grades}</p></>)}
              {r?.gcse && (<><p style={{ margin: "0 0 2px", fontSize: 11, fontFamily: "'Source Sans 3', sans-serif", color: "#666" }}>GCSE pass rate</p><Bar pct={r.gcse.pct} color="#1a3a5c" /><p style={{ fontSize: 11, fontFamily: "'Source Sans 3', sans-serif", color: "#555", margin: "3px 0 8px" }}>{r.gcse.grades}</p></>)}
              {r?.ibPct && (<><p style={{ margin: "0 0 2px", fontSize: 11, fontFamily: "'Source Sans 3', sans-serif", color: "#666" }}>IB pass rate</p><Bar pct={r.ibPct} color="#6c3483" /><p style={{ fontSize: 11, fontFamily: "'Source Sans 3', sans-serif", color: "#555", margin: "3px 0 8px" }}>Avg {r.ibAvg}</p></>)}
              {r?.prepNote && <div style={{ background: "#eafaf1", borderRadius: 5, padding: "7px 10px", fontSize: 11, fontFamily: "'Source Sans 3', sans-serif", color: "#145a32" }}>{r.prepNote}</div>}
            </div>
            <div>
              <SHead>Scholarships & Bursaries</SHead>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
                {s.scholarships.map(sc => <span key={sc} style={{ background: "#fff3cd", fontSize: 11, padding: "2px 8px", borderRadius: 20, fontFamily: "'Source Sans 3', sans-serif", color: "#7d5a00", textTransform: "capitalize" }}>🎓 {sc}</span>)}
                {s.bursaries && <span style={{ background: "#d1e8ff", fontSize: 11, padding: "2px 8px", borderRadius: 20, fontFamily: "'Source Sans 3', sans-serif", color: "#1a3a5c" }}>💷 Bursaries</span>}
              </div>
              <SHead>Reviews</SHead>
              <StarRow score={s.reviewScore} count={s.reviewCount} />
              <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 8, fontSize: 12, fontFamily: "'Source Sans 3', sans-serif" }}>
                {[["Good Schools Guide", `https://www.goodschoolsguide.co.uk/search?q=${encodeURIComponent(s.name)}`], ["Schoolguide.co.uk", `https://www.schoolguide.co.uk/search?q=${encodeURIComponent(s.name)}`], ["Mumsnet", `https://www.mumsnet.com/schools?q=${encodeURIComponent(s.name)}`]].map(([n, u]) => <a key={n} href={u} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ color: "#2471a3", textDecoration: "none" }}>↗ {n}</a>)}
              </div>
              <a href={s.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ display: "inline-block", marginTop: 10, background: "#1c2b1e", color: "#e8dfc8", padding: "7px 13px", borderRadius: 4, textDecoration: "none", fontSize: 12, fontWeight: 600, fontFamily: "'Source Sans 3', sans-serif" }}>Visit school →</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SchoolListView({ grouped, searchActive, selected, onSelect, hasUserCoords, matchedIds, searchTerms, shortlist, onToggleShortlist }) {
  return (
    <>
      {Object.entries(grouped).map(([group, schools]) => (
        <div key={group} style={{ marginBottom: 24 }}>
          {group && !searchActive && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <h2 style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "#1c2b1e", letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "'Source Sans 3', sans-serif" }}>{group}</h2>
              <div style={{ flex: 1, height: 1, background: "#d4c9b0" }} />
              <span style={{ fontSize: 11, color: "#aaa", fontFamily: "'Source Sans 3', sans-serif" }}>{schools.length}</span>
            </div>
          )}
          <div style={{ display: "grid", gap: 10 }}>
            {schools.map(s => <SchoolCard key={s.id} school={s} selected={selected === s.id} onSelect={() => onSelect(s.id)} hasUserCoords={hasUserCoords} isMatch={matchedIds.includes(s.id)} searchTerms={searchTerms} shortlisted={shortlist.includes(s.id)} onToggleShortlist={onToggleShortlist} shortlistFull={shortlist.length >= 4} />)}
          </div>
        </div>
      ))}
      <div style={{ height: 40 }} />
    </>
  );
}

function CompareView({ schools, onRemove, onClose }) {
  const rows = [
    { label: "Type", get: s => s.type },
    { label: "Ages", get: s => s.ages },
    { label: "Boarding", get: s => s.boarding },
    { label: "Annual fee", get: s => `${fmtFee(s.annualFee)}${s.feeVerified ? " (verified)" : " (est.)"}` },
    { label: "ISI rating", get: s => s.isiBand },
    { label: "A-level pass", get: s => s.results?.aLevel ? `${s.results.aLevel.pct}% · ${s.results.aLevel.grades}` : "—" },
    { label: "GCSE pass", get: s => s.results?.gcse ? `${s.results.gcse.pct}% · ${s.results.gcse.grades}` : "—" },
    { label: "IB average", get: s => s.results?.ibAvg ? `${s.results.ibAvg} (${s.results.ibPct}% pass)` : "—" },
    { label: "Oxbridge", get: s => s.oxbridge != null ? `${s.oxbridge}%` : "—" },
    { label: "Pupils", get: s => s.pupils },
    { label: "Founded", get: s => s.founded },
    { label: "Bursaries", get: s => s.bursaries ? "Yes" : "No" },
    { label: "Scholarships", get: s => s.scholarships.join(", ") },
    { label: "D of E", get: s => s.dofe ? "Yes" : "No" },
    { label: "CCF", get: s => s.ccf ? "Yes" : "No" },
    { label: "Review score", get: s => `${s.reviewScore}/5 (${s.reviewCount})` },
  ];
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(20,16,8,0.55)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
      <div style={{ background: "#fff", borderRadius: 10, maxWidth: 1100, width: "100%", maxHeight: "88vh", overflow: "auto", boxShadow: "0 12px 48px rgba(0,0,0,0.3)" }} onClick={e => e.stopPropagation()}>
        <div style={{ position: "sticky", top: 0, background: "#1c2b1e", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 2 }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#e8dfc8" }}>Compare shortlist ({schools.length})</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#e8dfc8", fontSize: 20, cursor: "pointer" }}>×</button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Source Sans 3', sans-serif", fontSize: 13 }}>
            <thead>
              <tr>
                <td style={{ padding: "12px 16px", background: "#faf8f4", borderBottom: "2px solid #d4c9b0", minWidth: 130, fontWeight: 700, color: "#888", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>School</td>
                {schools.map(s => (
                  <td key={s.id} style={{ padding: "12px 16px", background: "#faf8f4", borderBottom: "2px solid #d4c9b0", minWidth: 200, verticalAlign: "top" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 15, color: "#1a1a1a", fontFamily: "'Fraunces', serif" }}>{s.name}</div>
                        <div style={{ color: "#888", fontSize: 11, marginTop: 2 }}>{s.county}</div>
                      </div>
                      <button onClick={() => onRemove(s.id)} title="Remove from comparison" style={{ background: "none", border: "1px solid #d4c9b0", borderRadius: 4, cursor: "pointer", fontSize: 12, color: "#999", padding: "1px 6px", flexShrink: 0 }}>×</button>
                    </div>
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.label} style={{ background: i % 2 ? "#faf8f4" : "#fff" }}>
                  <td style={{ padding: "10px 16px", color: "#888", fontWeight: 600, borderBottom: "1px solid #ede8dc", verticalAlign: "top" }}>{row.label}</td>
                  {schools.map(s => (
                    <td key={s.id} style={{ padding: "10px 16px", borderBottom: "1px solid #ede8dc", verticalAlign: "top", color: "#333" }}>{row.get(s)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {schools.length === 0 && (
          <div style={{ padding: "40px 20px", textAlign: "center", color: "#888" }}>No schools shortlisted yet. Click the ☆ on a school card to add it here.</div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [search, setSearch] = useState("");
  const [county, setCounty] = useState("All");
  const [genderFilter, setGenderFilter] = useState("All");
  const [maxFee, setMaxFee] = useState(65000);
  const [ageGroup, setAgeGroup] = useState("All");
  const [userCoords, setUserCoords] = useState(null);
  const [radius, setRadius] = useState(25);
  const [selected, setSelected] = useState(null);
  const [sortBy, setSortBy] = useState("county");
  const [viewMode, setViewMode] = useState("list");
  const [matchedIds, setMatchedIds] = useState([]);
  const [showAdvisor, setShowAdvisor] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [shortlist, setShortlist] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const toggleShortlist = id => setShortlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : prev.length >= 4 ? prev : [...prev, id]);

  const ageFilter = {
    All: () => true,
    "Pre-Prep (3–7)": s => s.ageMin <= 5,
    "Prep (7–13)": s => s.ageMin <= 11 && s.ageMax >= 10,
    "Senior (11–18)": s => s.ageMax >= 16,
    "All-through": s => s.ageMin <= 5 && s.ageMax >= 16,
  };

  const searchTerms = useMemo(() => search.trim().split(/\s+/).filter(t => t.length > 1), [search]);

  const { filtered, searchStats } = useMemo(() => {
    let pool = SCHOOLS.filter(s => {
      if (county !== "All" && s.county !== county) return false;
      if (genderFilter !== "All" && s.type !== genderFilter) return false;
      if (s.annualFee > maxFee) return false;
      if (!ageFilter[ageGroup](s)) return false;
      if (userCoords) { s._distance = haversineKm(userCoords.lat, userCoords.lng, s.lat, s.lng); if (s._distance > radius * 1.60934) return false; } else { s._distance = null; }
      return true;
    });
    let list, stats = { totalBeforeSearch: pool.length, searchActive: false, matchReasons: {} };
    if (search.trim().length >= 2) {
      stats.searchActive = true;
      list = pool.map(s => { const m = matchSearch(s, search); return { ...s, _searchScore: m.score, _searchReasons: m.reasons, _searchMatched: m.matched }; }).filter(s => s._searchMatched)
        .sort((a, b) => { if (b._searchScore !== a._searchScore) return b._searchScore - a._searchScore; if (sortBy === "fee-asc") return a.annualFee - b.annualFee; if (sortBy === "fee-desc") return b.annualFee - a.annualFee; return a.county.localeCompare(b.county); });
      list.forEach(s => { s._searchReasons.forEach(r => { stats.matchReasons[r] = (stats.matchReasons[r] || 0) + 1; }); });
    } else {
      list = pool.sort((a, b) => {
        if (sortBy === "county") return a.county.localeCompare(b.county) || a.name.localeCompare(b.name);
        if (sortBy === "fee-asc") return a.annualFee - b.annualFee;
        if (sortBy === "fee-desc") return b.annualFee - a.annualFee;
        if (sortBy === "rating") return b.reviewScore - a.reviewScore;
        if (sortBy === "matches") { const ai = matchedIds.includes(b.id), bi = matchedIds.includes(a.id); if (ai !== bi) return ai ? -1 : 1; return b.reviewScore - a.reviewScore; }
        if (sortBy === "distance" && userCoords) return (a._distance || 0) - (b._distance || 0);
        return a.name.localeCompare(b.name);
      });
    }
    return { filtered: list, searchStats: stats };
  }, [search, county, genderFilter, maxFee, ageGroup, userCoords, radius, sortBy, matchedIds]);

  const grouped = useMemo(() => {
    if (searchStats.searchActive || sortBy !== "county") return { "": filtered };
    const g = {}; filtered.forEach(s => { (g[s.county] = g[s.county] || []).push(s); }); return g;
  }, [filtered, sortBy, searchStats.searchActive]);

  const activeFilters = [county !== "All", genderFilter !== "All", ageGroup !== "All", maxFee < 65000, !!userCoords].filter(Boolean).length;

  return (
    <div style={{ fontFamily: "'Source Sans 3', sans-serif", background: "#f8f6f1", minHeight: "100vh", color: "#1a1a1a" }}>
      <div style={{ background: "#1c2b1e", color: "#e8dfc8", padding: "16px 24px", borderBottom: "3px solid #8b7355" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 600, color: "#e8dfc8", fontFamily: "'Fraunces', serif", letterSpacing: -0.3 }}>UK Independent Schools</h1>
            <p style={{ margin: "2px 0 0", fontSize: 12, color: "#a09070", fontFamily: "'Source Sans 3', sans-serif" }}>{SCHOOLS.length} schools · fees, results, map, shortlist & AI matching</p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", position: "relative" }}>
            <button onClick={() => setShowAdvisor(v => !v)} style={{ padding: "8px 16px", background: showAdvisor ? "#c7a42f" : "rgba(199,164,47,0.2)", color: showAdvisor ? "#1c2b1e" : "#c7a42f", border: "1.5px solid #c7a42f", borderRadius: 6, fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>✦ {showAdvisor ? "Hide" : "Open"} School Advisor</button>
            <div style={{ display: "flex", gap: 3, background: "rgba(255,255,255,0.1)", borderRadius: 6, padding: 3 }}>
              {[["list","☰ List"],["split","⊞ Split"],["map","🗺 Map"]].map(([v, l]) => (
                <button key={v} onClick={() => setViewMode(v)} style={{ padding: "6px 12px", background: viewMode === v ? "#e8dfc8" : "transparent", color: viewMode === v ? "#1c2b1e" : "#e8dfc8", border: "none", borderRadius: 4, cursor: "pointer", fontSize: 12, fontFamily: "'Source Sans 3', sans-serif", fontWeight: viewMode === v ? 700 : 400 }}>{l}</button>
              ))}
            </div>
            <button onClick={() => setShowSettings(v => !v)} title="Settings" style={{ padding: "8px 10px", background: showSettings ? "rgba(255,255,255,0.15)" : "transparent", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 6, color: "#e8dfc8", fontSize: 14, cursor: "pointer" }}>⚙</button>
            {showSettings && (
              <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, background: "#fff", borderRadius: 8, boxShadow: "0 8px 28px rgba(0,0,0,0.25)", padding: 16, width: 300, zIndex: 50, border: "1px solid #d4c9b0" }}>
                <label style={labelStyle}>Anthropic API key <span style={{ color: "#aaa", fontWeight: 400, textTransform: "none" }}>(only needed outside claude.ai)</span></label>
                <input type="password" value={apiKey} onChange={e => setApiKey(e.target.value)} placeholder="sk-ant-…" style={inputStyle} />
                <p style={{ fontSize: 11, color: "#888", fontFamily: "'Source Sans 3', sans-serif", margin: "8px 0 0", lineHeight: 1.5 }}>
                  Stored only in this browser tab's memory — never saved, never sent anywhere except directly to api.anthropic.com when you run the School Advisor. Inside claude.ai this field isn't needed.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showDisclaimer && (
        <div style={{ background: "#fff8e6", borderBottom: "1px solid #f0d878", padding: "9px 24px" }}>
          <div style={{ maxWidth: 1300, margin: "0 auto", display: "flex", alignItems: "center", gap: 10, fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: "#7d5a00" }}>
            <span>⚠</span>
            <span style={{ flex: 1 }}>
              Fees for <strong>Eton, Wycombe Abbey & Lambrook</strong> are verified against current published fee schedules (2025/26, post-VAT). All other fees are <strong>estimates</strong> — adjusted for the January 2025 VAT change but not individually confirmed. Exam results and "known for" facts throughout are illustrative sample data. Always check directly with a school before relying on any figure here.
            </span>
            <button onClick={() => setShowDisclaimer(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 15, color: "#7d5a00", flexShrink: 0 }}>×</button>
          </div>
        </div>
      )}

      <div style={{ background: "#fff", borderBottom: "1px solid #d4c9b0", padding: "14px 24px", boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 12, alignItems: "end" }}>
            <div style={{ gridColumn: "span 2" }}>
              <label style={labelStyle}>Search <span style={{ color: "#aaa", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>— name, sport, subject, "swimming", "IB", "rowing", "CCF"…</span></label>
              <div style={{ position: "relative" }}>
                <input value={search} onChange={e => { setSearch(e.target.value); setSelected(null); }} placeholder={`Search within ${activeFilters > 0 ? `${searchStats.totalBeforeSearch} filtered` : "all"} schools…`} style={{ ...inputStyle, paddingLeft: 34 }} />
                <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 15, color: "#aaa" }}>🔍</span>
                {search && <button onClick={() => setSearch("")} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#aaa" }}>×</button>}
              </div>
            </div>
            <div><label style={labelStyle}>County</label><select value={county} onChange={e => setCounty(e.target.value)} style={inputStyle}><option>All</option>{COUNTIES.map(c => <option key={c}>{c}</option>)}</select></div>
            <div><label style={labelStyle}>Gender</label><select value={genderFilter} onChange={e => setGenderFilter(e.target.value)} style={inputStyle}><option>All</option><option>Boys</option><option>Girls</option><option>Co-ed</option></select></div>
            <div><label style={labelStyle}>Age group</label><select value={ageGroup} onChange={e => setAgeGroup(e.target.value)} style={inputStyle}>{Object.keys(ageFilter).map(a => <option key={a}>{a}</option>)}</select></div>
            <div><label style={labelStyle}>Max fee: {fmtFee(maxFee)}</label><input type="range" min={15000} max={65000} step={1000} value={maxFee} onChange={e => setMaxFee(+e.target.value)} style={{ width: "100%", accentColor: "#1c2b1e", cursor: "pointer", marginTop: 6 }} /></div>
            <div style={{ gridColumn: "span 2" }}>
              <label style={labelStyle}>Distance from</label>
              <AddressSearch onSelect={c => { setUserCoords({ lat: c.lat, lng: c.lng }); setSortBy("distance"); }} onClear={() => { setUserCoords(null); }} hasLocation={!!userCoords} />
              {userCoords && <div style={{ marginTop: 6 }}><select value={radius} onChange={e => setRadius(+e.target.value)} style={{ ...inputStyle, width: "auto" }}>{[5,10,15,20,25,30,40,50,75,100].map(r => <option key={r} value={r}>Within {r} miles</option>)}</select></div>}
            </div>
            {!searchStats.searchActive && (
              <div><label style={labelStyle}>Sort by</label>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={inputStyle}>
                  <option value="county">County</option><option value="fee-asc">Fee ↑</option><option value="fee-desc">Fee ↓</option><option value="rating">Rating</option>
                  {matchedIds.length > 0 && <option value="matches">★ AI Matches first</option>}
                  {userCoords && <option value="distance">Distance</option>}
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "20px 24px" }}>
        {showAdvisor && <div style={{ marginBottom: 24 }}><ChildAdvisor schools={SCHOOLS} onMatches={ids => { setMatchedIds(ids); if (ids.length > 0) setSortBy("matches"); }} apiKey={apiKey} /></div>}

        <div style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", fontFamily: "'Source Sans 3', sans-serif", fontSize: 13 }}>
          <span style={{ color: "#555" }}><strong style={{ color: "#1c2b1e", fontSize: 15 }}>{filtered.length}</strong>{searchStats.searchActive ? ` of ${searchStats.totalBeforeSearch} schools match` : ` schools`}{county !== "All" && <span style={{ color: "#888" }}> in {county}</span>}</span>
          {searchStats.searchActive && <span style={{ background: "#e8f4fd", border: "1px solid #bdd9f0", borderRadius: 20, padding: "2px 10px", fontSize: 12, color: "#1a3a5c" }}>🔍 Sorted by relevance to "<strong>{search}</strong>"</span>}
          {matchedIds.length > 0 && !searchStats.searchActive && <span style={{ color: "#c7a42f", fontWeight: 700 }}>★ {matchedIds.filter(id => filtered.find(s => s.id === id)).length} AI matches</span>}
          <span style={{ color: "#aaa", marginLeft: "auto" }}><span style={{ color: "#1a3a5c" }}>■ Boys</span> <span style={{ color: "#6c3483" }}>■ Girls</span> <span style={{ color: "#145a32" }}>■ Co-ed</span></span>
        </div>

        {searchStats.searchActive && Object.keys(searchStats.matchReasons).length > 0 && (
          <div style={{ marginBottom: 14, display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 11, color: "#888", fontFamily: "'Source Sans 3', sans-serif" }}>Matched on:</span>
            {Object.entries(searchStats.matchReasons).slice(0, 8).map(([reason, count]) => (
              <span key={reason} style={{ background: "#fff3cd", border: "1px solid #f0c040", borderRadius: 20, padding: "2px 9px", fontSize: 11, fontFamily: "'Source Sans 3', sans-serif", color: "#7d5a00" }}>{reason} {count > 1 ? `(${count})` : ""}</span>
            ))}
          </div>
        )}

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#888", fontFamily: "'Source Sans 3', sans-serif" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🏫</div>
            {searchStats.searchActive ? (<><p style={{ fontSize: 15, marginBottom: 8 }}>No schools match "<strong>{search}</strong>" within your current filters.</p><p style={{ fontSize: 13, color: "#aaa" }}>Try a sport (e.g. "rowing"), subject ("classics"), scholarship type ("music"), or clear some filters.</p><button onClick={() => setSearch("")} style={{ marginTop: 12, padding: "8px 18px", background: "#1c2b1e", color: "#e8dfc8", border: "none", borderRadius: 5, fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, cursor: "pointer" }}>Clear search</button></>) : (<p>No schools match your filters. Try widening distance, increasing fee limit, or clearing filters.</p>)}
          </div>
        ) : viewMode === "map" ? (
          <div style={{ height: "calc(100vh - 260px)", minHeight: 500, borderRadius: 8, overflow: "hidden", border: "1px solid #d4c9b0" }}>
            <SchoolMap schools={filtered} userCoords={userCoords} onSelect={id => { setSelected(s => s === id ? null : id); setViewMode("list"); }} matchedIds={matchedIds} />
          </div>
        ) : viewMode === "split" ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, height: "calc(100vh - 260px)", minHeight: 500 }}>
            <div style={{ overflowY: "auto" }}><SchoolListView grouped={grouped} searchActive={searchStats.searchActive} selected={selected} onSelect={id => setSelected(s => s === id ? null : id)} hasUserCoords={!!userCoords} matchedIds={matchedIds} searchTerms={searchTerms} shortlist={shortlist} onToggleShortlist={toggleShortlist} /></div>
            <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #d4c9b0" }}><SchoolMap schools={filtered} userCoords={userCoords} onSelect={id => setSelected(s => s === id ? null : id)} matchedIds={matchedIds} /></div>
          </div>
        ) : (
          <SchoolListView grouped={grouped} searchActive={searchStats.searchActive} selected={selected} onSelect={id => setSelected(s => s === id ? null : id)} hasUserCoords={!!userCoords} matchedIds={matchedIds} searchTerms={searchTerms} shortlist={shortlist} onToggleShortlist={toggleShortlist} />
        )}
      </div>

      {shortlist.length > 0 && (
        <div style={{ position: "fixed", bottom: 20, right: 20, background: "#1c2b1e", borderRadius: 10, boxShadow: "0 6px 24px rgba(0,0,0,0.25)", padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, zIndex: 100, border: "1.5px solid #c7a42f" }}>
          <div style={{ display: "flex", gap: 4 }}>
            {shortlist.map(id => {
              const s = SCHOOLS.find(sc => sc.id === id);
              return s ? <span key={id} title={s.name} style={{ width: 26, height: 26, borderRadius: "50%", background: "#c7a42f", color: "#1c2b1e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, fontFamily: "'Source Sans 3', sans-serif" }}>{s.name[0]}</span> : null;
            })}
          </div>
          <span style={{ color: "#e8dfc8", fontSize: 13, fontFamily: "'Source Sans 3', sans-serif" }}>{shortlist.length} shortlisted</span>
          <button onClick={() => setShowCompare(true)} style={{ background: "#c7a42f", color: "#1c2b1e", border: "none", borderRadius: 5, padding: "6px 12px", fontSize: 12, fontWeight: 700, fontFamily: "'Source Sans 3', sans-serif", cursor: "pointer" }}>Compare →</button>
          <button onClick={() => setShortlist([])} title="Clear shortlist" style={{ background: "none", border: "none", color: "#a09070", fontSize: 14, cursor: "pointer" }}>×</button>
        </div>
      )}

      {showCompare && (
        <CompareView
          schools={shortlist.map(id => SCHOOLS.find(s => s.id === id)).filter(Boolean)}
          onRemove={id => setShortlist(prev => prev.filter(x => x !== id))}
          onClose={() => setShowCompare(false)}
        />
      )}
    </div>
  );
}
