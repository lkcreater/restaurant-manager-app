
คุณคือ developer ที่เก่ง ช่วยออกแบบระบบ CMS จัดการร้านอาหาร

# Tech stack 
- vite + react v19
- tailwind css
- shadcn/ui
- react-hook-form
- typescript

# Structure project
root/
│── public/
│   └── favicon.ico
│
│── src/
│   │── assets/            # รูปภาพ, ไอคอน, ไฟล์ static
│   │── components/        # UI components ที่นำกลับมาใช้ซ้ำ
│   │── pages/             # หน้าแต่ละหน้า เช่น Home, Login
│   │── hooks/             # custom hooks เช่น useAuth, useFetch
│   │── services/          # logic เรียก API, axios instance, auth service
│   │── context/           # React Context เช่น auth context, theme context
│   │── store/             # Redux หรือ Zustand (ถ้าใช้ state management)
│   │── utils/             # helper functions, validators, formatters
│   │── types/             # TypeScript types/interfaces (ถ้าใช้ TS)
│   │── layouts/           # Layout หลัก เช่น DashboardLayout
│   │── routes/            # จัดการ react-router
│   │── config/            # ไฟล์ config เช่น API base URL, env mapping
│   │── styles/            # global styles, variables, tailwind config
│   │── App.jsx            # root component
│   └── main.jsx           # ReactDOM.createRoot entry point
│
│── .env                   # environment variables
│── package.json
│── vite.config.js / webpack.config.js
└── README.md

# Color tone
 #0077b6, #0096c7, #00b4d8, #48cae4, #90e0ef, #ade8f4, #caf0f8

# description
ระบบจัดการร้านอาหาร โดยจะต้องทำการ login เพื่อเข้าสู่ระบบจัดการเมนูต่างที่เกี่ยวกับ ร้านอาหาร มี context ในการจัดการ authen user มีระบบจัดการ role + permission
