'use client';

export default function MemberProfile({ member }) {
  if (!member) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500 text-lg">
        Select a member to view details.
      </div>
    );
  }

  return (
    <div className="h-full p-6 flex flex-col items-center bg-gradient-to-b from-white to-gray-100 rounded-lg shadow-inner">
      <div className="flex flex-col items-center space-y-2 mb-6">
        <div className="w-20 h-20 rounded-full bg-indigo-600 text-white flex items-center justify-center text-3xl font-bold shadow-md">
          {member[1].charAt(0)}
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">{member[1]}</h2>
      </div>

      <div className="w-full border-t border-gray-300 mb-4"></div>

      <div className="w-full space-y-3 text-gray-700">
        <Detail label="UserId" value={member[0]} />
        <Detail label="Email" value={member[2]} />
        <Detail label="Age" value={member[4]} />
        <Detail label="Gender" value={member[5]} />
        <Detail label="Blood Group" value={member[6]} />
        <Detail label="Joined" value={member[7]} />
        <Detail label="Modified" value={member[8]} />
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="flex justify-between text-sm md:text-base">
      <span className="font-medium text-gray-600">{label}:</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );
}
