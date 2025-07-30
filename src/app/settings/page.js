'use client';

import Theme from '../components/Theme';
import Guard from '../components/Guard';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import { useSelector } from 'react-redux';

export default function SettingsPage() {
  return (
    <Guard>
      <SettingsDashboard />
    </Guard>
  );
}

function SettingsDashboard() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="flex relative">
      <SideBar />
      <div className="flex-1 p-6 bg-white dark:bg-gray-900 min-h-screen transition duration-300">
        <Header />
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow text-black dark:text-white">
          <h1 className="text-3xl font-bold mb-4">Settings</h1>

          <div className="mb-6">
            <label className="block font-medium mb-2">User</label>
            <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded">
              {user?.email || 'Unknown'}
            </div>
          </div>

          <div className="mb-6">
            <label className="block font-medium mb-2">Theme Preference</label>
            <Theme />
          </div>
        </div>
      </div>
    </div>
  );
}

// 'use client';

// import { useSelector } from 'react-redux';
// import SideBar from '../components/SideBar';
// import Header from '../components/Header';
// import Guard from '../components/Guard';
// import ThemeSelector from '../components/ThemeSelector'; // ✅

// function SettingsContent() {
//   const user = useSelector((state) => state.auth.user);

//   return (
//     <div className="flex relative">
//       <SideBar />

//       <div className="flex-1 p-6 bg-[#FFE6E1] dark:bg-gray-900 min-h-screen transition duration-300">
//         <Header />
//         <div className="mt-10 px-6">
//           <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Settings</h1>

//           <div className="mb-6">
//             <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">User</label>
//             <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-md text-gray-900 dark:text-white">
//               {user?.email || 'Unknown'}
//             </div>
//           </div>

//           <div className="mb-10">
//             <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
//               Theme Preference
//             </label>
//             <ThemeSelector />
//           </div>

//           <div className="text-sm text-gray-500 dark:text-gray-400">
//             Your settings are stored locally. Future versions may allow server-side preferences.
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function SettingsPage() {
//   return (
//     <Guard>
//       <SettingsContent />
//     </Guard>
//   );
// }


