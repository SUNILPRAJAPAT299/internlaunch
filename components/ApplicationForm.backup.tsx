"use client";

import { useRef, useState } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FileUp, LoaderCircle, Upload } from "lucide-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db, storage } from "@/lib/firebase";

type FormData = { fullName: string; email: string; phone: string; college: string; course: string; year: string; city: string; resume: FileList; linkedin?: string; github?: string };
const fieldStyle = "mt-2 h-11 border-white/10 bg-white/[.035] px-3 text-slate-100 placeholder:text-slate-600 focus-visible:border-blue-400";

export function ApplicationForm() {
  const router = useRouter();
  const [fileName, setFileName] = useState("");
  const [submitError, setSubmitError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();
  const { ref: resumeRef, ...resume } = register("resume", { required: "Please upload your resume." });
  const submit = async (data: FormData) => {
    setSubmitError("");
    try {
      const resume = data.resume[0];
      const safeFileName = resume.name.replace(/[^a-zA-Z0-9._-]/g, "-");
      const resumeRef = ref(storage, `resumes/${crypto.randomUUID()}-${safeFileName}`);
      await uploadBytes(resumeRef, resume, { contentType: resume.type });
      const resumeURL = await getDownloadURL(resumeRef);

      const application = await addDoc(collection(db, "applications"), {
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        college: data.college,
        course: data.course,
        year: data.year,
        city: data.city,
        linkedin: data.linkedin || "",
        github: data.github || "",
        resumeURL,
        createdAt: serverTimestamp(),
        status: "Pending",
        paymentStatus: "Pending",
      });
      router.push(`/payment?applicationId=${application.id}`);
    } catch (error) {
      console.error("Unable to submit application", error);
      setSubmitError("We couldn’t submit your application. Please check your connection and try again.");
    }
  };
  return <form onSubmit={handleSubmit(submit)} className="rounded-2xl border border-white/10 bg-[#111b30]/85 p-5 shadow-2xl shadow-black/20 sm:p-8">
    <div className="grid gap-5 sm:grid-cols-2">
      <Field label="Full name" error={errors.fullName?.message}><Input placeholder="Your full name" className={fieldStyle} {...register("fullName", { required: "Full name is required." })}/></Field>
      <Field label="Email address" error={errors.email?.message}><Input type="email" placeholder="you@example.com" className={fieldStyle} {...register("email", { required: "Email is required.", pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email." } })}/></Field>
      <Field label="Phone number" error={errors.phone?.message}><Input inputMode="tel" placeholder="Your contact number" className={fieldStyle} {...register("phone", { required: "Phone number is required.", minLength: { value: 10, message: "Enter a valid phone number." } })}/></Field>
      <Field label="City" error={errors.city?.message}><Input placeholder="Your city" className={fieldStyle} {...register("city", { required: "City is required." })}/></Field>
      <Field label="College / university" error={errors.college?.message}><Input placeholder="Your institution" className={fieldStyle} {...register("college", { required: "College is required." })}/></Field>
      <Field label="Course" error={errors.course?.message}><Input placeholder="e.g. B.Tech Computer Science" className={fieldStyle} {...register("course", { required: "Course is required." })}/></Field>
      <Field label="Current year" error={errors.year?.message}><select className={`${fieldStyle} w-full rounded-lg border text-sm`} defaultValue="" {...register("year", { required: "Please select your year." })}><option value="" disabled>Select your year</option><option>1st year</option><option>2nd year</option><option>3rd year</option><option>4th year</option><option>Graduate / other</option></select></Field>
      <div className="sm:col-span-2"><Label>Resume <span className="text-blue-300">*</span></Label><input ref={node => { resumeRef(node); fileRef.current = node; }} type="file" accept=".pdf,.doc,.docx" className="hidden" {...resume} onChange={event => { resume.onChange(event); setFileName(event.target.files?.[0]?.name ?? ""); }}/><button type="button" onClick={() => fileRef.current?.click()} className="mt-2 flex w-full items-center justify-between rounded-xl border border-dashed border-white/15 bg-white/[.025] px-4 py-4 text-left transition hover:border-blue-400/50 hover:bg-blue-500/5"><span className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-lg bg-blue-500/12 text-blue-300"><FileUp className="size-4"/></span><span><span className="block text-sm font-medium text-slate-200">{fileName || "Upload your resume"}</span><span className="mt-0.5 block text-xs text-slate-500">PDF, DOC or DOCX — max 5MB</span></span></span><Upload className="size-4 text-slate-400"/></button>{errors.resume && <p className="mt-1.5 text-xs text-red-300">{errors.resume.message}</p>}</div>
      <Field label="LinkedIn profile" optional><Input type="url" placeholder="https://linkedin.com/in/..." className={fieldStyle} {...register("linkedin")}/></Field>
      <Field label="GitHub profile" optional><Input type="url" placeholder="https://github.com/..." className={fieldStyle} {...register("github")}/></Field>
    </div>
    {submitError && <p role="alert" className="mt-5 rounded-lg border border-red-400/20 bg-red-400/10 px-3 py-2 text-center text-sm text-red-200">{submitError}</p>}
    <Button type="submit" disabled={isSubmitting} className="mt-7 h-12 w-full rounded-xl bg-blue-500 text-sm font-semibold text-white hover:bg-blue-400">{isSubmitting ? <><LoaderCircle className="size-4 animate-spin"/>Submitting application...</> : "Submit application"}</Button>
    <p className="mt-4 text-center text-xs leading-5 text-slate-500">By submitting, you agree to receive application-related updates from InternLaunch.</p>
  </form>;
}
function Field({ label, error, optional, children }: { label: string; error?: string; optional?: boolean; children: ReactNode }) { return <div><Label className="text-sm text-slate-200">{label} {optional ? <span className="text-slate-500">(optional)</span> : <span className="text-blue-300">*</span>}</Label>{children}{error && <p className="mt-1.5 text-xs text-red-300">{error}</p>}</div> }
