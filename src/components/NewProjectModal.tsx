import React, { useState } from 'react';
import { X, Plus, Check } from 'lucide-react';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (project: any) => void;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [code, setCode] = useState('FLR-132');
  const [name, setName] = useState('Pacifica Coastal Residence');
  const [client, setClient] = useState('Pacifica Ocean Properties');
  const [address, setAddress] = useState('500 Shoreline Blvd, Pacifica, CA');
  const [stage, setStage] = useState('ESTIMATING');
  const [priority, setPriority] = useState('HIGH');
  const [areaSqft, setAreaSqft] = useState(2400);
  const [contractTotal, setContractTotal] = useState(38500);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      code,
      name,
      client,
      address,
      stage,
      priority,
      areaSqft,
      contractTotal,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden border border-[#DFE1E6]">
        <div className="px-5 py-3.5 bg-[#FAFBFC] border-b border-[#DFE1E6] flex items-center justify-between">
          <h3 className="text-[15px] font-bold text-[#172B4D]">+ New Project / Estimate Bid</h3>
          <button onClick={onClose} className="p-1 text-[#5E6C84] hover:text-[#172B4D] rounded">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-[12px]">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-[#172B4D] block mb-1">Project Code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-8 px-2.5 bg-[#F4F5F7] border border-[#DFE1E6] rounded font-mono font-bold text-[#0052CC] outline-none focus:bg-white focus:border-[#0052CC]"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-[#172B4D] block mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full h-8 px-2 bg-[#F4F5F7] border border-[#DFE1E6] rounded text-[#172B4D] outline-none"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High Priority</option>
                <option value="URGENT">Urgent Critical</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-[#172B4D] block mb-1">Project Title</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-8 px-2.5 bg-[#F4F5F7] border border-[#DFE1E6] rounded text-[#172B4D] outline-none focus:bg-white focus:border-[#0052CC]"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-[#172B4D] block mb-1">Client Name</label>
            <input
              type="text"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              className="w-full h-8 px-2.5 bg-[#F4F5F7] border border-[#DFE1E6] rounded text-[#172B4D] outline-none focus:bg-white focus:border-[#0052CC]"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-[#172B4D] block mb-1">Jobsite Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full h-8 px-2.5 bg-[#F4F5F7] border border-[#DFE1E6] rounded text-[#172B4D] outline-none focus:bg-white focus:border-[#0052CC]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-[#172B4D] block mb-1">Gross Area (sq ft)</label>
              <input
                type="number"
                value={areaSqft}
                onChange={(e) => setAreaSqft(Number(e.target.value))}
                className="w-full h-8 px-2.5 bg-[#F4F5F7] border border-[#DFE1E6] rounded font-mono text-[#172B4D] outline-none focus:bg-white focus:border-[#0052CC]"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-[#172B4D] block mb-1">Contract Total ($)</label>
              <input
                type="number"
                value={contractTotal}
                onChange={(e) => setContractTotal(Number(e.target.value))}
                className="w-full h-8 px-2.5 bg-[#F4F5F7] border border-[#DFE1E6] rounded font-mono text-[#172B4D] outline-none focus:bg-white focus:border-[#0052CC]"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#EBECF0]">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 bg-[#EBECF0] hover:bg-[#DFE1E6] text-[#172B4D] rounded font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#0052CC] hover:bg-[#0747A6] active:bg-[#00388B] text-white rounded font-bold shadow-sm transition-colors"
            >
              Create Project Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
