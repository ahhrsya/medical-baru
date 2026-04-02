import { useState } from 'react';
import { clinicians, patients } from '../lib/db';
import Button from '../components/ui/Button';
import { 
  ChevronRightIcon, 
  ChevronLeftIcon, 
  UserIcon, 
  CalendarIcon, 
  IdentificationIcon, 
  CheckCircleIcon,
  MagnifyingGlassIcon,
  ClockIcon,
  CurrencyEuroIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';

const steps = [
  { id: 1, name: 'Patient Search', icon: IdentificationIcon, description: 'Identify or register patient' },
  { id: 2, name: 'Service & Staff', icon: UserIcon, description: 'Select treatment and clinician' },
  { id: 3, name: 'Date & Time', icon: CalendarIcon, description: 'Choose available slot' },
  { id: 4, name: 'Confirmation', icon: CheckCircleIcon, description: 'Review and finalize' },
];

const morningSlots = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30'];
const afternoonSlots = ['13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];

const services = [
  { id: 1, name: 'General Consultation', duration: '20 min', price: '€85', color: 'bg-teal-50 text-teal-700' },
  { id: 2, name: 'Physiotherapy', duration: '45 min', price: '€110', color: 'bg-amber-50 text-amber-700' },
  { id: 3, name: 'Dermatology Review', duration: '30 min', price: '€95', color: 'bg-purple-50 text-purple-700' },
  { id: 4, name: 'Mental Health Session', duration: '50 min', price: '€140', color: 'bg-sky-50 text-sky-700' },
];

export default function BookingFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedService, setSelectedService] = useState(services[0]);
  const [selectedClinician, setSelectedClinician] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNext = () => currentStep < 4 && setCurrentStep(currentStep + 1);
  const handleBack = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.id.includes(searchQuery)
  );

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in duration-700 pb-20">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4">
         <div>
            <h1 className="text-3xl font-bold font-plus-jakarta text-[#111827] tracking-tight">Book New Appointment</h1>
            <p className="text-sm text-[#6B7280] font-medium mt-1">Guided clinical intake for clinic staff and receptionists.</p>
         </div>
         <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-[#F0FDFA] rounded-full border border-[#CCFBF1]">
               <p className="text-xs font-bold text-[#0D9488]">Step {currentStep} of 4</p>
            </div>
         </div>
      </div>

      {/* Progress Stepper - High Fidelity */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {steps.map((step) => (
           <div 
             key={step.id} 
             className={`p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
               currentStep === step.id 
                 ? 'bg-white border-[#0D9488] shadow-lg shadow-[#0D9488]/5 ring-1 ring-[#0D9488]' 
                 : currentStep > step.id 
                   ? 'bg-[#F0FDFA] border-[#CCFBF1]' 
                   : 'bg-white border-[#F1F5F9]'
             }`}
           >
              <div className="flex items-center gap-3 relative z-10">
                 <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                   currentStep >= step.id ? 'bg-[#0D9488] text-white' : 'bg-[#F1F5F9] text-[#94A3B8]'
                 }`}>
                    {currentStep > step.id ? <CheckCircleIcon className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                 </div>
                 <div>
                    <p className={`text-xs font-bold font-plus-jakarta ${currentStep >= step.id ? 'text-[#111827]' : 'text-[#94A3B8]'}`}>{step.name}</p>
                    <p className="text-[10px] text-[#6B7280] font-medium hidden md:block">{step.description}</p>
                 </div>
              </div>
              {currentStep === step.id && (
                 <div className="absolute bottom-0 left-0 h-1 bg-[#0D9488] w-full animate-in slide-in-from-left duration-500" />
              )}
           </div>
        ))}
      </div>

      {/* Wizard Container */}
      <div className="bg-white rounded-3xl border border-[#F1F5F9] shadow-xl shadow-slate-200/50 p-8 min-h-[500px] flex flex-col relative overflow-hidden">
         {/* Background Decoration */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-[#F0FDFA] rounded-full blur-3xl opacity-50 -mr-32 -mt-32" />
         
         <div className="relative z-10 flex-1 flex flex-col">
          {currentStep === 1 && (
              <div className="space-y-8 flex-1 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center justify-between">
                   <h3 className="text-xl font-bold text-[#111827]">Patient Identification</h3>
                   <button className="flex items-center gap-2 text-xs font-bold text-[#0D9488] hover:bg-[#F0FDFA] px-3 py-1.5 rounded-lg border border-transparent hover:border-[#CCFBF1] transition-all">
                      <UserPlusIcon className="w-4 h-4" />
                      Register New Patient
                   </button>
                </div>
                
                <div className="max-w-2xl space-y-6">
                   <div className="relative">
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                         <MagnifyingGlassIcon className="h-5 w-5 text-[#94A3B8]" />
                      </div>
                      <input 
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl pl-12 pr-4 py-4 placeholder:text-[#94A3B8] focus:ring-2 focus:ring-[#0D9488]/10 focus:border-[#0D9488] outline-none transition-all text-sm font-medium"
                        placeholder="Search by name, patient ID, or date of birth..."
                      />
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredPatients.slice(0, 4).map(p => (
                         <div 
                            key={p.id}
                            onClick={() => setSelectedPatient(p)}
                            className={`p-5 rounded-2xl border transition-all cursor-pointer group relative ${
                              selectedPatient?.id === p.id 
                                ? 'bg-[#F0FDFA] border-[#0D9488] shadow-md ring-1 ring-[#0D9488]/50' 
                                : 'bg-white border-[#F1F5F9] hover:border-[#0D9488]/30 hover:shadow-lg'
                            }`}
                         >
                            <div className="flex items-start gap-4">
                               <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                                 selectedPatient?.id === p.id ? 'bg-[#0D9488] text-white' : 'bg-[#F1F5F9] text-[#111827]'
                               }`}>
                                  {p.name[0]}
                               </div>
                               <div className="min-w-0 flex-1">
                                  <p className="text-sm font-bold text-[#111827] truncate">{p.name}</p>
                                  <p className="text-[10px] text-[#6B7280] font-medium mt-1 font-mono uppercase tracking-tight">PID: {p.id} &bull; DOB: 1988-06-12</p>
                                  <div className="flex items-center gap-2 mt-2">
                                     <span className="px-1.5 py-0.5 bg-slate-100 rounded text-[9px] font-bold text-slate-500 uppercase">Regular</span>
                                     <span className="px-1.5 py-0.5 bg-teal-50 rounded text-[9px] font-bold text-teal-600 uppercase">Premium</span>
                                  </div>
                               </div>
                            </div>
                            {selectedPatient?.id === p.id && (
                               <div className="absolute top-4 right-4">
                                  <CheckCircleIcon className="w-5 h-5 text-[#0D9488]" />
                               </div>
                            )}
                         </div>
                      ))}
                      {filteredPatients.length === 0 && (
                         <div className="col-span-full py-12 text-center bg-[#F8FAFC] rounded-2xl border border-dashed border-[#E2E8F0]">
                            <p className="text-sm text-[#6B7280] font-medium">No patients found matching your search.</p>
                            <button className="mt-4 text-xs font-bold text-[#0D9488] hover:underline">Register " {searchQuery} " as new patient?</button>
                         </div>
                      )}
                   </div>
                </div>
              </div>
          )}

          {currentStep === 2 && (
              <div className="space-y-8 flex-1 animate-in fade-in slide-in-from-right-4 duration-500">
                  <h3 className="text-xl font-bold text-[#111827]">Service & Practitioner Selection</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                     <div className="space-y-6">
                        <p className="text-xs font-bold text-[#6B7280] uppercase tracking-widest">1. Select Medical Service</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                           {services.map(service => (
                              <div 
                                 key={service.id}
                                 onClick={() => setSelectedService(service)}
                                 className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                                   selectedService?.id === service.id 
                                     ? 'bg-white border-[#0D9488] shadow-md ring-1 ring-[#0D9488]/20' 
                                     : 'bg-[#F8FAFC] border-transparent hover:border-[#0D9488]/30 hover:bg-white'
                                 }`}
                              >
                                 <div className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase mb-2 ${service.color}`}>
                                    {service.name.split(' ')[0]}
                                 </div>
                                 <p className="text-xs font-bold text-[#111827]">{service.name}</p>
                                 <div className="flex items-center justify-between mt-3">
                                    <span className="text-[10px] text-[#6B7280] font-medium flex items-center gap-1">
                                       <ClockIcon className="w-3 h-3" />
                                       {service.duration}
                                    </span>
                                    <span className="text-xs font-bold text-[#111827]">{service.price}</span>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>

                     <div className="space-y-6">
                        <p className="text-xs font-bold text-[#6B7280] uppercase tracking-widest">2. Select Preferred Practitioner</p>
                        <div className="space-y-3">
                           {clinicians.slice(0, 4).map((c) => (
                              <div 
                                key={c.id} 
                                onClick={() => setSelectedClinician(c)}
                                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                                  selectedClinician?.id === c.id 
                                    ? 'bg-[#F0FDFA] border-[#0D9488] shadow-md' 
                                    : 'bg-white border-[#F1F5F9] hover:border-[#0D9488]/30'
                                }`}
                              >
                                 <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl ${c.bgOpacity} flex items-center justify-center font-bold ${c.color} shrink-0`}>
                                       {c.name.split('. ')[1][0]}
                                    </div>
                                    <div>
                                       <p className="text-xs font-bold text-[#111827] leading-tight">{c.name}</p>
                                       <p className="text-[10px] text-[#6B7280] font-medium mt-0.5">{c.specialty}</p>
                                    </div>
                                 </div>
                                 <div className="flex flex-col items-end gap-1">
                                    <span className="text-[9px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">Available Today</span>
                                    {selectedClinician?.id === c.id && <CheckCircleIcon className="w-4 h-4 text-[#0D9488]" />}
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
              </div>
          )}

          {currentStep === 3 && (
              <div className="space-y-8 flex-1 animate-in fade-in slide-in-from-right-4 duration-500">
                <h3 className="text-xl font-bold text-[#111827]">Schedule Availability</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                   <div className="lg:col-span-1 space-y-4">
                      <p className="text-xs font-bold text-[#6B7280] uppercase tracking-widest">Select Appointment Date</p>
                      <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-[#F1F5F9]">
                         {/* Calendar Mock Placeholder */}
                         <div className="grid grid-cols-7 gap-1 text-center">
                            {['M','T','W','T','F','S','S'].map(d => <span key={d} className="text-[10px] font-bold text-[#94A3B8] pb-4">{d}</span>)}
                            {Array.from({length: 31}).map((_, i) => (
                               <div 
                                 key={i} 
                                 className={`h-8 w-8 flex items-center justify-center text-[11px] font-bold rounded-xl transition-all cursor-pointer ${
                                   i === 1 ? 'bg-[#0D9488] text-white shadow-lg shadow-[#0D9488]/20 ring-4 ring-[#0D9488]/10' : 'text-[#64748B] hover:bg-white hover:shadow-sm'
                                 }`}
                               >
                                  {i + 1}
                               </div>
                            ))}
                         </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-[#F0FDFA] rounded-2xl border border-[#CCFBF1]">
                         <CalendarIcon className="w-5 h-5 text-[#0D9488]" />
                         <p className="text-xs font-bold text-[#0D9488]">April 02, 2026 (Thursday)</p>
                      </div>
                   </div>

                   <div className="lg:col-span-2 space-y-8">
                      <div>
                         <p className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-4">Morning Sessions</p>
                         <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                            {morningSlots.map(t => (
                               <button 
                                  key={t}
                                  onClick={() => setSelectedTime(t)}
                                  className={`py-3 rounded-xl text-xs font-bold border transition-all ${
                                    selectedTime === t 
                                      ? 'bg-[#0D9488] border-[#0D9488] text-white shadow-xl shadow-[#0D9488]/20' 
                                      : 'bg-white border-[#F1F5F9] text-[#111827] hover:border-[#0D9488] hover:text-[#0D9488]'
                                  }`}
                               >
                                  {t}
                               </button>
                            ))}
                         </div>
                      </div>

                      <div>
                         <p className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-4">Afternoon Sessions</p>
                         <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                            {afternoonSlots.map(t => (
                               <button 
                                  key={t}
                                  onClick={() => setSelectedTime(t)}
                                  className={`py-3 rounded-xl text-xs font-bold border transition-all ${
                                    selectedTime === t 
                                      ? 'bg-[#0D9488] border-[#0D9488] text-white shadow-xl shadow-[#0D9488]/20' 
                                      : 'bg-white border-[#F1F5F9] text-[#111827] hover:border-[#0D9488] hover:text-[#0D9488]'
                                  }`}
                               >
                                  {t}
                               </button>
                            ))}
                         </div>
                      </div>
                      
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                         <div className="flex items-center gap-2 text-[#6B7280]">
                            <ClockIcon className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase">Staff Note:</span>
                         </div>
                         <p className="text-[11px] text-[#6B7280] mt-1 italic">Slots shown are for 20-minute consultations. For longer procedures, please contact the coordinator.</p>
                      </div>
                   </div>
                </div>
              </div>
          )}

          {currentStep === 4 && (
              <div className="space-y-10 flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto animate-in zoom-in-95 duration-500">
                 <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-[#F0FDFA] flex items-center justify-center text-[#0D9488] ring-8 ring-[#F0FDFA]/50 animate-pulse">
                        <CheckCircleIcon className="w-12 h-12" />
                    </div>
                    <div>
                       <h3 className="text-2xl font-bold font-plus-jakarta text-[#111827]">Selection Summary</h3>
                       <p className="text-sm text-[#6B7280] font-medium mt-1">Review the appointment details before publishing to clinicians calendar.</p>
                    </div>
                 </div>

                 <div className="w-full bg-[#F8FAFC] rounded-3xl p-8 border border-[#F1F5F9] space-y-6 relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-1">
                          <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Patient Records</p>
                          <p className="text-sm font-bold text-[#111827]">{selectedPatient?.name}</p>
                          <p className="text-xs text-[#6B7280] font-medium">Internal ID: {selectedPatient?.id} &bull; Gender: Female</p>
                       </div>
                       <div className="space-y-1 md:text-right">
                          <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Assigned Practitioner</p>
                          <p className="text-sm font-bold text-[#111827]">{selectedClinician?.name || 'Round Robin / Any'}</p>
                          <p className="text-xs text-[#6B7280] font-medium">{selectedClinician?.specialty || 'General Practice'}</p>
                       </div>
                       <div className="space-y-1">
                          <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Service Details</p>
                          <p className="text-sm font-bold text-[#111827]">{selectedService?.name}</p>
                          <p className="text-xs font-bold text-[#0D9488] mt-1 shrink-0 flex items-center gap-1.5">
                             <ClockIcon className="w-3.5 h-3.5" />
                             {selectedService?.duration} session
                          </p>
                       </div>
                       <div className="space-y-1 md:text-right">
                          <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Scheduled Time</p>
                          <p className="text-sm font-bold text-[#111827]">Thursday, April 02, 2026</p>
                          <p className="text-lg font-black text-[#0D9488] tracking-tight">@ {selectedTime || 'Not set'}</p>
                       </div>
                    </div>

                    <div className="pt-6 border-t border-[#E5E7EB] flex items-center justify-between">
                       <div className="flex items-center gap-2">
                          <CurrencyEuroIcon className="w-5 h-5 text-[#6B7280]" />
                          <span className="text-sm font-bold text-[#6B7280]">Consultation Fee</span>
                       </div>
                       <div className="text-right">
                          <span className="text-2xl font-black text-[#111827] tracking-tight">{selectedService?.price}.00</span>
                          <p className="text-[10px] text-[#6B7280] font-bold uppercase tracking-wider">VAT Included (21%)</p>
                       </div>
                    </div>
                 </div>

                 <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100 max-w-md">
                    <IdentificationIcon className="w-5 h-5 text-amber-600 shrink-0" />
                    <p className="text-[11px] text-amber-700 font-medium">By confirming, an SMS/Email notification will be sent automatically to the patient with prep-instructions for {selectedService?.name}.</p>
                 </div>
              </div>
          )}
         </div>

         {/* Wizard Navigation Footer */}
         <div className="mt-12 pt-10 flex justify-between border-t border-[#F1F5F9] relative z-10">
            <Button 
               variant="secondary" 
               className="px-6 py-2.5 rounded-2xl border border-[#F1F5F9] hover:bg-[#F8FAFC] transition-all"
               onClick={handleBack} 
               disabled={currentStep === 1}
            >
               <ChevronLeftIcon className="w-4 h-4 mr-2" />
               Previous
            </Button>
            <div className="flex gap-4">
               {currentStep < 4 ? (
                 <Button 
                   variant="primary" 
                   className="px-8 py-2.5 bg-[#0D9488] hover:bg-[#0F766E] text-white rounded-2xl shadow-lg shadow-[#0D9488]/20 transition-all font-bold"
                   onClick={handleNext}
                   disabled={(currentStep === 1 && !selectedPatient) || (currentStep === 3 && !selectedTime)}
                 >
                   Continue
                   <ChevronRightIcon className="w-4 h-4 ml-2" />
                 </Button>
               ) : (
                 <Button 
                   variant="primary" 
                   className="px-10 py-2.5 bg-[#0D9488] hover:bg-[#0F766E] text-white rounded-2xl shadow-xl shadow-[#0D9488]/30 transition-all font-black text-sm uppercase tracking-wider"
                   onClick={() => alert('Booking Published to Clinician Calendar!')}
                 >
                    Confirm & Publish
                 </Button>
               )}
            </div>
         </div>
      </div>
    </div>
  );
}
