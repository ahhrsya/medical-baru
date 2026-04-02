import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  UserPlusIcon,
  XMarkIcon,
  PhoneIcon,
  EnvelopeIcon
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
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedService, setSelectedService] = useState(services[0]);
  const [selectedClinician, setSelectedClinician] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Register New Patient State
  const [isRegistering, setIsRegistering] = useState(false);
  const [newPatient, setNewPatient] = useState({ name: '', phone: '', email: '', dob: '' });

  const handleNext = () => currentStep < 4 && setCurrentStep(currentStep + 1);
  const handleBack = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  const handleRegisterPatient = (e) => {
    e.preventDefault();
    const mockNewPatient = {
      id: `P${Math.floor(Math.random() * 9000) + 1000}`,
      name: newPatient.name,
      ...newPatient
    };
    setSelectedPatient(mockNewPatient);
    setIsRegistering(false);
    setCurrentStep(2); // Auto-advance to Step 2
  };

  const handleFinalConfirm = () => {
    // Show success state briefly or just navigate
    navigate('/calendar');
  };

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

      {/* Progress Stepper */}
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
         <div className="relative z-10 flex-1 flex flex-col">
          {currentStep === 1 && (
              <div className="space-y-8 flex-1 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center justify-between">
                   <h3 className="text-xl font-bold text-[#111827]">Patient Identification</h3>
                   <button 
                    onClick={() => setIsRegistering(true)}
                    className="flex items-center gap-2 text-xs font-bold text-[#0D9488] hover:bg-[#F0FDFA] px-3 py-1.5 rounded-lg border border-transparent hover:border-[#CCFBF1] transition-all"
                   >
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
                         </div>
                      ))}
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
                                   selectedService?.id === service.id ? 'bg-white border-[#0D9488] shadow-md ring-1 ring-[#0D9488]/20' : 'bg-[#F8FAFC] border-transparent hover:border-[#0D9488]/30 hover:bg-white'
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
                        <p className="text-xs font-bold text-[#6B7280] uppercase tracking-widest">2. Select Practitioner</p>
                        <div className="space-y-3">
                           {clinicians.slice(0, 4).map((c) => (
                              <div 
                                key={c.id} 
                                onClick={() => setSelectedClinician(c)}
                                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                                  selectedClinician?.id === c.id ? 'bg-[#F0FDFA] border-[#0D9488] shadow-md' : 'bg-white border-[#F1F5F9] hover:border-[#0D9488]/30'
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
                      <p className="text-xs font-bold text-[#6B7280] uppercase tracking-widest">Select Date</p>
                      <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-[#F1F5F9]">
                         <div className="grid grid-cols-7 gap-1 text-center">
                            {['M','T','W','T','F','S','S'].map(d => <span key={d} className="text-[10px] font-bold text-[#94A3B8] pb-4">{d}</span>)}
                            {Array.from({length: 31}).map((_, i) => (
                               <div 
                                 key={i} 
                                 className={`h-8 w-8 flex items-center justify-center text-[11px] font-bold rounded-xl transition-all ${
                                   i === 1 ? 'bg-[#0D9488] text-white shadow-lg' : 'text-[#64748B]'
                                 }`}
                               >
                                  {i + 1}
                               </div>
                            ))}
                         </div>
                      </div>
                   </div>

                   <div className="lg:col-span-2 space-y-8">
                      <div>
                         <p className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-4">Time Slots</p>
                         <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                            {[...morningSlots, ...afternoonSlots].map(t => (
                               <button 
                                  key={t}
                                  onClick={() => setSelectedTime(t)}
                                  className={`py-3 rounded-xl text-xs font-bold border transition-all ${
                                    selectedTime === t ? 'bg-[#0D9488] border-[#0D9488] text-white' : 'bg-white border-[#F1F5F9] text-[#111827]'
                                  }`}
                               >
                                  {t}
                               </button>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>
              </div>
          )}

          {currentStep === 4 && (
              <div className="space-y-10 flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto animate-in zoom-in-95 duration-500">
                 <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-[#F0FDFA] flex items-center justify-center text-[#0D9488] ring-8 ring-[#F0FDFA]/50">
                        <CheckCircleIcon className="w-12 h-12" />
                    </div>
                    <div>
                       <h3 className="text-2xl font-bold font-plus-jakarta text-[#111827]">Selection Summary</h3>
                       <p className="text-sm text-[#6B7280] font-medium mt-1">Review the appointment details before publishing.</p>
                    </div>
                 </div>

                 <div className="w-full bg-[#F8FAFC] rounded-3xl p-8 border border-[#F1F5F9] space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-1">
                          <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Patient Records</p>
                          <p className="text-sm font-bold text-[#111827]">{selectedPatient?.name}</p>
                          <p className="text-xs text-[#6B7280] font-medium">Internal ID: {selectedPatient?.id}</p>
                       </div>
                       <div className="space-y-1 md:text-right">
                          <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Practitioner</p>
                          <p className="text-sm font-bold text-[#111827]">{selectedClinician?.name}</p>
                          <p className="text-xs text-[#6B7280] font-medium">{selectedClinician?.specialty}</p>
                       </div>
                       <div className="space-y-1">
                          <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Service</p>
                          <p className="text-sm font-bold text-[#111827]">{selectedService?.name}</p>
                          <p className="text-xs font-bold text-[#0D9488]">{selectedService?.duration}</p>
                       </div>
                       <div className="space-y-1 md:text-right">
                          <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Time</p>
                          <p className="text-sm font-bold text-[#111827]">Thursday, April 02, 2026</p>
                          <p className="text-lg font-black text-[#0D9488]">@ {selectedTime}</p>
                       </div>
                    </div>
                 </div>
              </div>
          )}
         </div>

         {/* Navigation Footer */}
         <div className="mt-12 pt-10 flex justify-between border-t border-[#F1F5F9] relative z-10">
            <Button variant="secondary" onClick={handleBack} disabled={currentStep === 1}>
               <ChevronLeftIcon className="w-4 h-4 mr-2" />
               Previous
            </Button>
            <Button 
               variant="primary" 
               onClick={currentStep === 4 ? handleFinalConfirm : handleNext}
               disabled={(currentStep === 1 && !selectedPatient) || (currentStep === 3 && !selectedTime)}
            >
               {currentStep === 4 ? 'Confirm & Go to Calendar' : 'Continue'}
               <ChevronRightIcon className="w-4 h-4 ml-2" />
            </Button>
         </div>
      </div>

      {/* Register Patient Overlay Modal */}
      {isRegistering && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1e293b]/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
               <div className="px-8 py-6 border-b border-[#F1F5F9] flex justify-between items-center bg-[#F8FAFC]">
                  <h3 className="text-xl font-bold text-[#111827]">Register New Patient</h3>
                  <button onClick={() => setIsRegistering(false)} className="p-2 hover:bg-white rounded-xl transition-colors">
                     <XMarkIcon className="w-6 h-6 text-[#94A3B8]" />
                  </button>
               </div>
               <form onSubmit={handleRegisterPatient} className="p-8 space-y-6">
                  <div className="space-y-4">
                     <div>
                        <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-widest mb-1.5">Full Name</label>
                        <input 
                           required
                           type="text" 
                           value={newPatient.name}
                           onChange={e => setNewPatient({...newPatient, name: e.target.value})}
                           placeholder="Ex: Emma Richardson"
                           className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0D9488]/10 focus:border-[#0D9488] outline-none transition-all"
                        />
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                           <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-widest mb-1.5">Phone Number</label>
                           <input 
                              type="tel" 
                              required
                              placeholder="+33 600 000 000"
                              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0D9488]/10 focus:border-[#0D9488] outline-none transition-all"
                           />
                        </div>
                        <div>
                           <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-widest mb-1.5">Date of Birth</label>
                           <input 
                              type="date" 
                              required
                              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0D9488]/10 focus:border-[#0D9488] outline-none transition-all"
                           />
                        </div>
                     </div>
                     <div>
                        <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-widest mb-1.5">Email Address</label>
                        <input 
                           type="email" 
                           placeholder="emma@example.com"
                           className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0D9488]/10 focus:border-[#0D9488] outline-none transition-all"
                        />
                     </div>
                  </div>
                  <div className="pt-4 flex gap-3">
                     <Button type="button" variant="secondary" className="flex-1" onClick={() => setIsRegistering(false)}>Cancel</Button>
                     <Button type="submit" variant="primary" className="flex-1 bg-[#0D9488] hover:bg-[#0F766E] text-white">Save & Select Patient</Button>
                  </div>
               </form>
            </div>
         </div>
      )}
    </div>
  );
}
