import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const VerificationForm = ({ 
  verificationStatus, 
  verificationNotes, 
  setVerificationNotes, 
  verificationChecklist, 
  setVerificationChecklist,
  handleVerificationSubmit 
}) => {
  const updateChecklistItem = (key, value) => {
    setVerificationChecklist({
      ...verificationChecklist,
      [key]: value
    });
  };

  const allChecked = Object.values(verificationChecklist).every(Boolean);

  return (
    <motion.div className="bg-background-lighter rounded-2xl p-6 shadow-neumorph">
      <h2 className="text-lg font-medium text-white mb-4">Verification Process</h2>
      
      {verificationStatus === 'pending' ? (
        <>
          <div className="space-y-4 mb-6">
            <div className="bg-background p-4 rounded-xl">
              <h3 className="text-white font-medium mb-3">Verification Checklist</h3>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="documentFormat"
                    checked={verificationChecklist.documentFormat}
                    onChange={(e) => updateChecklistItem('documentFormat', e.target.checked)}
                    className="rounded text-primary focus:ring-primary mr-3"
                  />
                  <label htmlFor="documentFormat" className="text-gray-300">Document format is valid and consistent</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="issuerVerified"
                    checked={verificationChecklist.issuerVerified}
                    onChange={(e) => updateChecklistItem('issuerVerified', e.target.checked)}
                    className="rounded text-primary focus:ring-primary mr-3"
                  />
                  <label htmlFor="issuerVerified" className="text-gray-300">Issuer has been verified as legitimate</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="contentAuthenticity"
                    checked={verificationChecklist.contentAuthenticity}
                    onChange={(e) => updateChecklistItem('contentAuthenticity', e.target.checked)}
                    className="rounded text-primary focus:ring-primary mr-3"
                  />
                  <label htmlFor="contentAuthenticity" className="text-gray-300">Content authenticity confirmed</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="noTampering"
                    checked={verificationChecklist.noTampering}
                    onChange={(e) => updateChecklistItem('noTampering', e.target.checked)}
                    className="rounded text-primary focus:ring-primary mr-3"
                  />
                  <label htmlFor="noTampering" className="text-gray-300">No evidence of tampering or alterations</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="validSignatures"
                    checked={verificationChecklist.validSignatures}
                    onChange={(e) => updateChecklistItem('validSignatures', e.target.checked)}
                    className="rounded text-primary focus:ring-primary mr-3"
                  />
                  <label htmlFor="validSignatures" className="text-gray-300">Signatures and seals are valid</label>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="verificationNotes" className="block text-white font-medium mb-2">
                Verification Notes
              </label>
              <textarea
                id="verificationNotes"
                value={verificationNotes}
                onChange={(e) => setVerificationNotes(e.target.value)}
                className="w-full bg-background border-0 text-white rounded-xl p-3 focus:ring-2 focus:ring-primary focus:outline-none"
                rows="4"
                placeholder="Add any notes or observations about this document..."
              ></textarea>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              onClick={() => handleVerificationSubmit('approve')}
              disabled={!allChecked}
              className={`flex-1 flex justify-center items-center px-4 py-3 rounded-xl text-white ${allChecked ? 'bg-green-500 hover:bg-green-600' : 'bg-green-500/50 cursor-not-allowed'} transition-colors`}
              whileHover={allChecked ? { scale: 1.05 } : {}}
              whileTap={allChecked ? { scale: 0.95 } : {}}
            >
              <CheckIcon className="h-5 w-5 mr-2" />
              Approve Document
            </motion.button>
            
            <motion.button
              onClick={() => handleVerificationSubmit('reject')}
              disabled={!verificationNotes.trim()}
              className={`flex-1 flex justify-center items-center px-4 py-3 rounded-xl text-white ${verificationNotes.trim() ? 'bg-red-500 hover:bg-red-600' : 'bg-red-500/50 cursor-not-allowed'} transition-colors`}
              whileHover={verificationNotes.trim() ? { scale: 1.05 } : {}}
              whileTap={verificationNotes.trim() ? { scale: 0.95 } : {}}
            >
              <XMarkIcon className="h-5 w-5 mr-2" />
              Reject Document
            </motion.button>
          </div>
          
          {!allChecked && (
            <p className="mt-3 text-yellow-500 text-sm">Complete all checklist items before approving</p>
          )}
          
          {!verificationNotes.trim() && (
            <p className="mt-3 text-yellow-500 text-sm">Add notes explaining the reason before rejecting</p>
          )}
        </>
      ) : (
        <div className={`p-4 rounded-xl ${verificationStatus === 'approved' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
          <div className="flex items-center">
            {verificationStatus === 'approved' ? (
              <CheckIcon className="h-6 w-6 mr-2" />
            ) : (
              <XMarkIcon className="h-6 w-6 mr-2" />
            )}
            <span className="font-medium">
              Document {verificationStatus === 'approved' ? 'Approved' : 'Rejected'}
            </span>
          </div>
          <p className="mt-2 text-sm">Redirecting to document queue...</p>
        </div>
      )}
    </motion.div>
  );
};

export default VerificationForm;
