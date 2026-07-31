"use client";

import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import { collection, onSnapshot, orderBy, query, Timestamp, doc, updateDoc } from "firebase/firestore";
import { Download, ExternalLink, LoaderCircle, LogOut, LockKeyhole, Search, UsersRound } from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Application = {
  id: string;

  applicationId?: string;

  name: string;
  email: string;
  phone: string;

  college: string;
  course: string;
  year: string;
  city: string;

  internship?: string;
  mode?: string;

  linkedin?: string;
  github?: string;
  resumeURL?: string;

  createdAt?: Timestamp;

  paymentStatus?: string;
  paymentId?: string;
};
const formatDate = (date?: Timestamp) => date?.toDate().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) ?? "—";

export function AdminDashboard() {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  useEffect(() => onAuthStateChanged(auth, setUser), []);
  if (user === undefined) return <LoadingScreen />;
  return user ? <Dashboard user={user} /> : <AdminLogin />;
}

function AdminLogin() {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState(""); const [pending, setPending] = useState(false);
  const login = async (event: React.FormEvent) => { event.preventDefault(); setError(""); setPending(true); try { await signInWithEmailAndPassword(auth, email, password); } catch (error: any) {
      console.error("Firebase Login Error:", error);
      setError(`${error.code} : ${error.message}`);
    } finally { setPending(false); } };
  return <main className="grid min-h-screen place-items-center bg-[#0b1324] px-5"><form onSubmit={login} className="w-full max-w-md rounded-3xl border border-white/10 bg-[#121d33] p-7 shadow-2xl shadow-black/25 sm:p-9"><div className="grid size-12 place-items-center rounded-xl bg-blue-500/15 text-blue-300"><LockKeyhole className="size-5"/></div><p className="mt-6 text-sm font-medium text-blue-300">InternLaunch Admin</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">Welcome back.</h1><p className="mt-3 text-sm leading-6 text-slate-400">Sign in with an authorized Firebase Authentication account to manage applications.</p><label className="mt-7 block text-sm font-medium text-slate-200">Email<input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-white/[.035] px-3 text-white outline-none focus:border-blue-400" placeholder="admin@example.com"/></label><label className="mt-5 block text-sm font-medium text-slate-200">Password<input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-white/[.035] px-3 text-white outline-none focus:border-blue-400" placeholder="••••••••"/></label>{error && <p role="alert" className="mt-4 rounded-lg bg-red-400/10 px-3 py-2 text-sm text-red-200">{error}</p>}<Button type="submit" disabled={pending} className="mt-6 h-11 w-full rounded-lg bg-blue-500 text-white hover:bg-blue-400">{pending ? <><LoaderCircle className="size-4 animate-spin"/>Signing in...</> : "Sign in securely"}</Button></form></main>;
}

function Dashboard({ user }: { user: User }) {
  const [applications, setApplications] = useState<Application[]>([]); const [loading, setLoading] = useState(true); const [error, setError] = useState(""); const [search, setSearch] = useState(""); const [selected, setSelected] = useState<Application | null>(null);
  useEffect(() => onSnapshot(query(collection(db, "applications"), orderBy("createdAt", "desc")), snapshot => { setApplications(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Application)); setLoading(false); }, () => { setError("Unable to load applications. Confirm the signed-in account has Firestore access."); setLoading(false); }), []);
 const filtered = useMemo(() => {
  const keyword = search.toLowerCase().trim();

  return applications.filter(item =>
    `
${item.applicationId}
${item.name}
${item.email}
${item.phone}
${item.college}
${item.course}
${item.internship}
${item.mode}
`
      .toLowerCase()
      .includes(keyword)
  );
}, [applications, search]);[
  "ID",
  "Name",
  "Internship",
  "Mode",
  "Email",
  "Phone",
  "Payment",
  "Applied",
  ""
]
  const paid = applications.filter(item => item.paymentStatus === "Paid").length; const pending = applications.length - paid;
  return <main className="min-h-screen bg-[#0b1324] px-5 py-8 text-slate-100 lg:px-8 lg:py-10"><div className="mx-auto max-w-7xl"><header className="flex flex-col justify-between gap-5 border-b border-white/8 pb-7 sm:flex-row sm:items-end"><div><p className="text-sm font-medium text-blue-300">InternLaunch Admin</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">Applications dashboard</h1><p className="mt-2 text-sm text-slate-400">Signed in as {user.email}</p></div><Button onClick={() => signOut(auth)} variant="outline" className="border-white/10 bg-white/[.03] text-slate-200 hover:bg-white/10"><LogOut className="size-4"/>Sign out</Button></header><section className="mt-7 grid gap-4 sm:grid-cols-3"><Metric label="Total applications" value={applications.length} tone="text-white"/><Metric label="Paid students" value={paid} tone="text-emerald-300"/><Metric label="Pending students" value={pending} tone="text-amber-300"/></section><section className="mt-6 rounded-2xl border border-white/8 bg-[#121d33] p-4"><label className="relative block"><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500"/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search Application ID, Name, Email, Phone, Internship..." className="h-11 w-full rounded-lg border border-white/10 bg-white/[.035] pl-10 pr-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-400"/></label></section><section className="mt-5 overflow-hidden rounded-2xl border border-white/8 bg-[#121d33]"><div className="overflow-x-auto"><table className="min-w-[900px] w-full text-left text-sm"><thead className="border-b border-white/8 bg-white/[.025] text-xs uppercase tracking-wider text-slate-500"><tr>
  {[
    "ID",
    "Name",
    "Internship",
    "Mode",
    "Email",
    "Phone",
    "Payment",
    "Applied",
    "",
  ].map((head) => (
    <th key={head} className="px-5 py-4 font-medium">
      {head}
    </th>
  ))}
</tr></thead><tbody className="divide-y divide-white/7">{loading ? <tr><td colSpan={8} className="px-5 py-16 text-center text-slate-400"><LoaderCircle className="mr-2 inline size-4 animate-spin"/>Loading applications...</td></tr> : error ? <tr><td colSpan={8} className="px-5 py-16 text-center text-red-200">{error}</td></tr> : filtered.length ? filtered.map(item => <tr key={item.id} className="hover:bg-white/[.025]">
<td className="px-5 py-4 font-mono text-blue-300">
  {item.applicationId || "N/A"}
</td>

<td className="px-5 py-4 font-medium text-white">
  {item.name}
</td>

<td className="px-5 py-4 text-slate-300">
  {item.internship || "—"}
</td>

<td className="px-5 py-4 text-slate-300">
  {item.mode || "—"}
</td>

<td className="px-5 py-4 text-slate-400">
  {item.email}
</td>

<td className="px-5 py-4 text-slate-400">
  {item.phone}
</td>

<td className="px-5 py-4">
  <Badge paid={item.paymentStatus === "Paid"} />
</td>

<td className="px-5 py-4 text-slate-400">
  {formatDate(item.createdAt)}
</td>
  <td className="px-5 py-4"><Button onClick={() => setSelected(item)} variant="outline" size="sm" className="border-white/10 bg-white/[.03] text-slate-200 hover:bg-white/10">View</Button></td></tr>) : <tr><td colSpan={8} className="px-5 py-16 text-center text-slate-400"><UsersRound className="mx-auto mb-3 size-6 text-slate-600"/>No applications found.</td></tr>}</tbody></table></div></section></div><ApplicationDetails
application={
selected
? applications.find(a=>a.id===selected.id) ?? selected
: null
}
onClose={() => setSelected(null)}
/></main>;
}

function Metric({ label, value, tone }: { label: string; value: number; tone: string }) { return <div className="rounded-2xl border border-white/8 bg-[#121d33] p-5"><p className="text-sm text-slate-400">{label}</p><p className={`mt-2 text-3xl font-semibold ${tone}`}>{value}</p></div>; }
function Badge({ paid }: { paid: boolean }) { return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${paid ? "bg-emerald-400/10 text-emerald-300" : "bg-amber-400/10 text-amber-300"}`}>{paid ? "Paid" : "Pending"}</span>; }
function ApplicationDetails({ application, onClose }: { application: Application | null; onClose: () => void }) {

const updateStatus = async (status: "Paid" | "Rejected") => {
  if (!application) return;

  try {
    console.log("Updating:",application.id);await updateDoc(doc(db,"applications",application.id),{
      paymentStatus: status
    });

    alert("Status updated to " + status);
    onClose();
  } catch (e) {
    console.error(e);
    alert("Update failed");
  }
};

return <Dialog open={Boolean(application)} onOpenChange={open => !open && onClose()}><DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto border border-white/10 bg-[#121d33] p-0 text-slate-100 sm:max-w-2xl" showCloseButton><DialogHeader className="border-b border-white/8 px-6 py-5 pr-12"><DialogTitle className="text-xl text-white">{application?.name}</DialogTitle><DialogDescription className="mt-1 text-slate-400">Full application details</DialogDescription></DialogHeader>{application && <div className="px-6 py-5"><div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
  <Detail
  label="Application ID"
  value={application.applicationId || "N/A"}
/>

<Detail
  label="Internship"
  value={application.internship || "Not Selected"}
/>

<Detail
  label="Mode"
  value={application.mode || "Not Selected"}
/>
  <Detail label="Email" value={application.email}/><Detail label="Phone" value={application.phone}/><Detail label="College" value={application.college}/><Detail label="Course" value={`${application.course} · ${application.year}`}/><Detail label="City" value={application.city}/><Detail label="Applied date" value={formatDate(application.createdAt)}/><Detail label="Payment" value={application.paymentStatus || "Pending"}/><Detail label="Payment ID" value={application.paymentId || "—"}/>{application.linkedin && <Detail label="LinkedIn" value={application.linkedin}/>} {application.github && <Detail label="GitHub" value={application.github}/>}</div><div className="mt-7 border-t border-white/8 pt-5">{application.resumeURL ? <a href={application.resumeURL} target="_blank" rel="noreferrer" download className="inline-flex h-10 items-center gap-2 rounded-lg bg-blue-500 px-4 text-sm font-semibold text-white hover:bg-blue-400"><Download className="size-4"/>Download resume</a> : <span className="text-sm text-slate-500">Resume unavailable</span>}{application.linkedin && <a href={application.linkedin} target="_blank" rel="noreferrer" className="ml-3 inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 px-4 text-sm text-slate-200 hover:bg-white/5"><ExternalLink className="size-4"/>LinkedIn</a>}</div>
<div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-6">
  <Button onClick={() => updateStatus("Paid")} className="bg-emerald-600 hover:bg-emerald-500">
    Approve
  </Button>

  <Button variant="destructive" onClick={() => updateStatus("Rejected")}>
    Reject
  </Button>

  <a
    href={`https://wa.me/${application.phone}`}
    target="_blank"
    rel="noreferrer"
    className="inline-flex h-10 items-center rounded-lg border border-white/10 px-4 text-sm"
  >
    WhatsApp
  </a>

  <a
    href={`tel:${application.phone}`}
    className="inline-flex h-10 items-center rounded-lg border border-white/10 px-4 text-sm"
  >
    Call Student
  </a>
</div>

</div>}
</DialogContent>
</Dialog>;
}

function Detail({ label, value }: { label: string; value: string }) { return <div><p className="text-xs uppercase tracking-wider text-slate-500">{label}</p><p className="mt-1.5 break-words text-sm text-slate-200">{value}</p></div>; }
function LoadingScreen() { return <main className="grid min-h-screen place-items-center bg-[#0b1324] text-slate-400"><LoaderCircle className="size-6 animate-spin"/></main>; }
