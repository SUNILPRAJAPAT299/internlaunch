#!/bin/bash

echo "🚀 Adding Application ID support..."

python3 <<'PY'
from pathlib import Path

# ---------- ApplicationForm ----------
p = Path("components/ApplicationForm.tsx")
t = p.read_text()

if "applicationId:" not in t:
    t = t.replace(
        'try {\n      \n',
        'try {\n      const applicationId = `IL-${Date.now().toString().slice(-8)}`;\n'
    )

    t = t.replace(
        'name: data.fullName,',
        'applicationId: applicationId,\n        name: data.fullName,'
    )

    p.write_text(t)
    print("✅ ApplicationForm patched")
else:
    print("⏭ ApplicationForm already patched")


# ---------- Status Page ----------
p = Path("app/status/page.tsx")
t = p.read_text()

if "const [applicationId" not in t:

    t = t.replace(
        'const [email, setEmail] = useState("");',
        '''const [email, setEmail] = useState("");
  const [applicationId, setApplicationId] = useState("");'''
    )

    t = t.replace(
        'where("email", "==", email.trim())',
        '''where("email", "==", email.trim()),
        where("applicationId", "==", applicationId.trim())'''
    )

    old = '''
        <input
          className="w-full mt-8 rounded-lg bg-zinc-800 p-3 outline-none"
          placeholder="Enter Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
'''

    new = '''
        <input
          className="w-full mt-8 rounded-lg bg-zinc-800 p-3 outline-none"
          placeholder="Application ID"
          value={applicationId}
          onChange={(e)=>setApplicationId(e.target.value)}
        />

        <input
          className="w-full mt-4 rounded-lg bg-zinc-800 p-3 outline-none"
          placeholder="Enter Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
'''

    t = t.replace(old,new)

    p.write_text(t)
    print("✅ Status page patched")
else:
    print("⏭ Status page already patched")

print("\n🎉 Patch Complete")
PY

echo ""
echo "Now run:"
echo "npm run build"
