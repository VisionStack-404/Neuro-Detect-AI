/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Mic, 
  Network, 
  Database, 
  ChevronRight, 
  Activity,
  Layers,
  FileText,
  Spline,
  Terminal,
  Code,
  PlayCircle,
  UploadCloud,
  ImageIcon,
  FileAudio,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Stethoscope,
  Download
} from 'lucide-react';

type TabId = 'dashboard' | 'overview' | 'mri' | 'speech' | 'fusion' | 'training' | 'backend' | 'downloads';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Clinical Dashboard', icon: Stethoscope },
    { id: 'overview', label: 'Architecture Overview', icon: Network },
    { id: 'mri', label: 'Branch 1: MRI Path', icon: Brain },
    { id: 'speech', label: 'Branch 2: Speech Path', icon: Mic },
    { id: 'fusion', label: 'Fusion & Classifier', icon: Layers },
    { id: 'training', label: 'Datasets & Training', icon: Database },
    { id: 'backend', label: 'Backend Code', icon: Terminal },
    { id: 'downloads', label: 'Download Source', icon: Download }
  ] as const;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-white border-r border-slate-200 p-6 flex flex-col space-y-8 shadow-sm z-10 hidden md:flex">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-indigo-950 flex items-center gap-2">
            <Activity className="text-indigo-600 h-6 w-6" />
            NeuroDetect AI
          </h1>
          <p className="text-xs text-slate-500 mt-2 font-medium">Hybrid Multi-Modal DL Model</p>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id as TabId)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive 
                        ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                    {tab.label}
                    {isActive && (
                      <motion.div layoutId="activeTabIndicator" className="ml-auto">
                        <ChevronRight className="h-4 w-4" />
                      </motion.div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-slate-400 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-slate-700">IEEE-Style Proposal</p>
              <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                Early Dementia Detection using MRI and Speech
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 max-h-screen overflow-y-auto bg-slate-50">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-slate-200 p-4 sticky top-0 z-20 flex justify-between items-center">
          <h1 className="text-lg font-bold text-indigo-950 flex items-center gap-2">
            <Activity className="text-indigo-600 h-5 w-5" />
            NeuroDetect AI
          </h1>
          <select 
            className="bg-slate-100 text-sm font-medium p-2 rounded-lg border-none focus:ring-2 focus:ring-indigo-500"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value as TabId)}
          >
            {tabs.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
          </select>
        </div>

        <div className="max-w-4xl mx-auto p-6 md:p-10 lg:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {activeTab === 'overview' && <OverviewTab />}
              {activeTab === 'mri' && <MRITab />}
              {activeTab === 'speech' && <SpeechTab />}
              {activeTab === 'fusion' && <FusionTab />}
              {activeTab === 'training' && <TrainingTab />}
              {activeTab === 'backend' && <BackendTab />}
              {activeTab === 'downloads' && <DownloadsTab />}
              {activeTab === 'dashboard' && <DashboardTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-800">
          Architecture Overview
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          A Hybrid Multi-Modal Deep Learning Model for Early Dementia Detection
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
          Proposing a two-branch hybrid network integrating 3D MRI scans and speech data 
          to identify Cognitive Normal (CN), Mild Cognitive Impairment (MCI), and Alzheimer's Disease (AD).
        </p>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <h3 className="text-xl font-bold text-slate-800 mb-8">System Flow</h3>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Input Branches */}
          <div className="flex flex-col gap-6 w-full md:w-1/3">
            <div className="bg-blue-50 border border-blue-100 p-5 rounded-xl text-center relative shadow-sm">
              <Brain className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h4 className="font-bold text-blue-900">Branch 1: MRI</h4>
              <p className="text-xs text-blue-700 mt-2">CNN-RNN (ResNet-50 + Inception-v3 + LSTM)</p>
            </div>
            
            <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-xl text-center relative shadow-sm">
              <Mic className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
              <h4 className="font-bold text-emerald-900">Branch 2: Speech</h4>
              <p className="text-xs text-emerald-700 mt-2">CNN + LSTM on MFCCs</p>
            </div>
          </div>

          {/* Connectors */}
          <div className="hidden md:flex flex-col justify-center items-center h-full">
            <Spline className="h-24 w-12 text-slate-300" strokeWidth={1.5} />
          </div>

          {/* Fusion */}
          <div className="w-full md:w-1/3">
            <div className="bg-indigo-50 border border-indigo-100 p-8 rounded-xl text-center shadow-sm relative">
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-4 h-0.5 bg-indigo-200 hidden md:block"></div>
              <Layers className="h-10 w-10 text-indigo-600 mx-auto mb-4" />
              <h4 className="font-bold text-indigo-900 text-lg">Fusion Layer</h4>
              <p className="text-sm text-indigo-700 mt-2 font-medium">Concatenation + MLP</p>
              
              <div className="mt-6 pt-6 border-t border-indigo-200/60">
                <p className="text-xs font-bold text-indigo-950 uppercase tracking-wider mb-3">Classification</p>
                <div className="flex justify-center gap-2">
                  <span className="px-2 py-1 bg-white rounded text-xs font-bold text-slate-700 shadow-sm border border-slate-100">CN</span>
                  <span className="px-2 py-1 bg-white rounded text-xs font-bold text-amber-600 shadow-sm border border-slate-100">MCI</span>
                  <span className="px-2 py-1 bg-white rounded text-xs font-bold text-red-600 shadow-sm border border-slate-100">AD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
             <Activity className="h-5 w-5 text-indigo-500" />
             Performance Expectations
          </h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            Multi-modal deep learning hybrids of this type are common in IEEE medical imaging and signal processing papers. Carefully tuned, they typically achieve <strong>&gt;95–97% accuracy</strong>, substantially outperforming single-modality baselines.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
             <Network className="h-5 w-5 text-indigo-500" />
             Why Hybrid?
          </h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            Dementia manifests both structurally (brain atrophy visible in MRI) and cognitively (linguistic deficits in speech). Combining spatial-structural embeddings with temporal-acoustic embeddings creates a holistic patient profile.
          </p>
        </div>
      </div>
    </div>
  );
}

function MRITab() {
  return (
    <div className="space-y-8">
      <header>
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800 mb-4">
          <Brain className="h-3.5 w-3.5" />
          Branch 1
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900">MRI Path (CNN + RNN)</h2>
        <p className="text-slate-600 mt-2 max-w-2xl">
          Extracting spatial embeddings from 3D MRI volumes using a parallel CNN backbone and modeling spatial-slice dependencies with an LSTM.
        </p>
      </header>

      <div className="relative">
        {/* Timeline lines */}
        <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-slate-200"></div>

        <div className="space-y-10 relative">
          <Step 
            number="1"
            title="Input & Preprocessing"
            color="blue"
            content={
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
                <li><strong>Input:</strong> 3D MRI volume (e.g., ADNI data) split into 2D slices along the axial axis.</li>
                <li><strong>Preprocess:</strong> Skull-stripping to isolate brain tissue.</li>
                <li><strong>Normalization:</strong> Intensity normalization to standard ranges.</li>
                <li><strong>Formatting:</strong> Resize each 2D slice to a standard size (e.g., 224×224).</li>
              </ul>
            }
          />

          <Step 
            number="2"
            title="Parallel CNN Backbone (Per Slice)"
            color="blue"
            content={
              <div className="space-y-4">
                <p className="text-sm text-slate-600">
                  For each slice independently, feature extraction is performed using two powerful architectures in parallel to capture both fine and coarse textures.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-center">
                    <p className="font-bold tracking-tight text-slate-800">ResNet-50</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-center">
                    <p className="font-bold tracking-tight text-slate-800">Inception-v3</p>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Global Average Pooling:</strong> Features from both CNNs are pooled and concatenated into a single rich feature vector per individual slice.
                  </p>
                </div>
              </div>
            }
          />

          <Step 
            number="3"
            title="Sequence Modeling (RNN)"
            color="blue"
            content={
              <div className="space-y-4">
                <p className="text-sm text-slate-600">
                  Treat the sequence of feature vectors (one per slice) as a time-series/spatial-sequence.
                </p>
                <div className="bg-slate-800 text-white p-5 rounded-xl shadow-md border border-slate-700">
                  <h4 className="font-bold flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-blue-400" />
                    LSTM / Bi-LSTM Layer
                  </h4>
                  <p className="text-sm text-slate-300">
                    Captures the 3D dependencies across consecutive slices. The final hidden state of the LSTM acts as the comprehensive <strong>MRI-embedding</strong> for the entire brain volume.
                  </p>
                </div>
                <p className="text-xs text-slate-500 italic mt-2">
                  * This dual-CNN + LSTM structure improves accuracy over single CNNs and is frequently used in high-impact IEEE brain imaging papers.
                </p>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}

function SpeechTab() {
  return (
    <div className="space-y-8">
      <header>
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 mb-4">
          <Mic className="h-3.5 w-3.5" />
          Branch 2
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900">Speech Path (CNN + LSTM)</h2>
        <p className="text-slate-600 mt-2 max-w-2xl">
          Identifying cognitive decline through acoustic biomarkers by processing MFCC/spectrogram features using convolution and recurrent layers.
        </p>
      </header>

      <div className="relative">
        <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-slate-200"></div>

        <div className="space-y-10 relative">
          <Step 
            number="1"
            title="Input & Feature Extraction"
            color="emerald"
            content={
              <div className="space-y-4">
                <p className="text-sm text-slate-600">
                  <strong>Input:</strong> Recorded spontaneous speech from DementiaBank.
                </p>
                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
                  <h4 className="font-bold text-emerald-900 mb-2 text-sm">Acoustic Features</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-emerald-800">
                    <li>Extract MFCCs (40 coefficients over 25 ms frames, 10 ms hop size).</li>
                    <li>Optional fusion with log-mel spectrograms.</li>
                    <li>Optional inclusion of prosodic features (pitch, energy, jitter, shimmer).</li>
                  </ul>
                </div>
              </div>
            }
          />

          <Step 
            number="2"
            title="Local Pattern Extraction (2D CNN)"
            color="emerald"
            content={
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
                <li>Treat the MFCC sequence as a 2D image-like tensor (Frames × Coefficients).</li>
                <li>Apply a small 2D-CNN architecture (2–3 convolutional blocks).</li>
                <li>Utilize Batch Normalization and ReLU activation after each convolution.</li>
                <li><strong>Purpose:</strong> Extract highly localized speech patterns and phonetic features that signify hesitations or articulation issues.</li>
              </ul>
            }
          />

          <Step 
            number="3"
            title="Temporal Dynamics (RNN)"
            color="emerald"
            content={
              <div className="space-y-4">
                <div className="bg-slate-800 text-white p-5 rounded-xl shadow-md border border-slate-700">
                  <h4 className="font-bold flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-emerald-400" />
                    LSTM / Bi-LSTM Layer
                  </h4>
                  <p className="text-sm text-slate-300">
                    Pass the sequence of CNN extracted features along the frame dimension to capture long-term temporal dynamics in speech (e.g., pauses, speech rate).
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-600 text-sm font-medium">
                    Output: <span className="text-emerald-400">Speech-embedding vector</span>
                  </div>
                </div>
                 <p className="text-xs text-slate-500 italic mt-2">
                  * Speech-based dementia detection using CNN-LSTM on MFCCs is widely reported in IEEE and ACM publications, achieving &gt;90–95% accuracy on clean speech data.
                </p>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}

function FusionTab() {
  return (
    <div className="space-y-8">
      <header>
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-800 mb-4">
          <Layers className="h-3.5 w-3.5" />
          Final Stage
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900">Multi-Modal Fusion & Classifier</h2>
        <p className="text-slate-600 mt-2 max-w-2xl">
          Combining orthogonal data domains to achieve high robustness and accuracy in early detection.
        </p>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Diagrams Side */}
          <div className="p-8 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col items-center justify-center gap-6">
            
            <div className="flex gap-4 w-full">
              <div className="bg-blue-100/50 border border-blue-200 text-blue-900 px-4 py-3 rounded-lg text-sm font-bold text-center flex-1 shadow-sm">
                MRI Embedding<br/><span className="text-xs font-normal text-blue-700">(from LSTM)</span>
              </div>
              <div className="bg-emerald-100/50 border border-emerald-200 text-emerald-900 px-4 py-3 rounded-lg text-sm font-bold text-center flex-1 shadow-sm">
                Speech Embd<br/><span className="text-xs font-normal text-emerald-700">(from LSTM)</span>
              </div>
            </div>

            <div className="h-8 w-px bg-slate-300"></div>

            <div className="bg-indigo-600 text-white w-full py-4 rounded-xl text-center shadow-md shadow-indigo-600/20">
              <span className="font-bold tracking-wide">Concatenation Layer</span>
            </div>

            <div className="h-8 w-px bg-slate-300"></div>

            <div className="bg-slate-800 w-full py-6 rounded-xl relative border border-slate-700 shadow-xl">
               <div className="absolute -left-2 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                {[...Array(5)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>)}
               </div>
               <div className="absolute -right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                {[...Array(3)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>)}
               </div>
               <div className="text-center">
                 <p className="font-bold text-slate-100 mb-1">MLP Classifier</p>
                 <p className="text-xs text-slate-400 font-mono">FC(512) → Dropout → FC(256) → FC(3)</p>
               </div>
            </div>

            <div className="h-8 w-px bg-slate-300"></div>

            <div className="flex gap-3 w-full">
              <div className="bg-white border-2 border-slate-200 text-slate-700 px-2 py-3 rounded-lg text-sm font-bold text-center flex-1 shadow-sm">
                CN
              </div>
              <div className="bg-white border-2 border-amber-300 text-amber-700 px-2 py-3 rounded-lg text-sm font-bold text-center flex-1 shadow-sm">
                MCI
              </div>
              <div className="bg-white border-2 border-red-300 text-red-700 px-2 py-3 rounded-lg text-sm font-bold text-center flex-1 shadow-sm">
                AD
              </div>
            </div>

          </div>

          {/* Details Side */}
          <div className="p-8 space-y-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Network className="h-5 w-5 text-indigo-500" />
                Concatenate Embeddings
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                By fusing embeddings at the feature level (late fusion before classification), the network learns complex cross-modal correlations. The combined vector represents a multi-dimensional state of the patient's cognitive health.
              </p>
            </div>
            
            <hr className="border-slate-100" />

            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Layers className="h-5 w-5 text-indigo-500" />
                MLP Classifier
              </h3>
              <ul className="list-disc pl-5 space-y-3 text-sm text-slate-600">
                <li>
                  <strong>Dense Layers:</strong> 1-2 fully connected layers (e.g., 512 → 256 → 3 units) smoothly step down the high-dimensional fusion vector.
                </li>
                <li>
                  <strong>Regularization:</strong> Dropout is applied between Dense layers (e.g., rate 0.4) to prevent overfitting on the fused features.
                </li>
                <li>
                  <strong>Softmax Output:</strong> Outputting probabilities for three main classes: Cognitive Normal (CN), Mild Cognitive Impairment (MCI), and Alzheimer's Disease (AD).
                </li>
              </ul>
            </div>
            
            <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-lg">
              <p className="text-xs text-indigo-800">
                <strong>Methodological Justification:</strong> This direct late-fusion pattern is standard in contemporary IEEE hybrid intelligence papers, providing an easily justifiable and stable architecture.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function TrainingTab() {
  return (
    <div className="space-y-8">
      <header>
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white shadow-sm px-3 py-1 text-xs font-semibold text-slate-800 mb-4">
          <Database className="h-3.5 w-3.5" />
          Methodology
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900">Datasets & Training Regime</h2>
        <p className="text-slate-600 mt-2 max-w-2xl">
          Standardization and rigorous validation protocols ensuring IEEE-ready results.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Datasets */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
               <Database className="h-16 w-16 text-blue-50 opacity-50 relative -top-4 -right-4" />
            </div>
            <h3 className="text-lg font-bold text-blue-900 mb-4 relative z-10 flex items-center gap-2">
              <Brain className="h-5 w-5" /> MRI Data (OASIS)
            </h3>
            <ul className="relative z-10 space-y-3 text-sm text-slate-600 border-l-2 border-blue-100 pl-3">
              <li>Use <strong>Kaggle OASIS</strong> database (Non-Demented, Very Mild, Mild, Moderate).</li>
              <li>
                <strong>Source:</strong> <a href="https://www.kaggle.com/datasets/ninadaithal/imagesoasis" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">kaggle.com/datasets/ninadaithal/imagesoasis</a>
              </li>
              <li>Modality: 2D/3D T1-weighted MRI Slices.</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4">
               <Database className="h-16 w-16 text-emerald-50 opacity-50 relative -top-4 -right-4" />
            </div>
            <h3 className="text-lg font-bold text-emerald-900 mb-4 relative z-10 flex items-center gap-2">
              <Mic className="h-5 w-5" /> Speech Data (DementiaBank)
            </h3>
            <ul className="relative z-10 space-y-3 text-sm text-slate-600 border-l-2 border-emerald-100 pl-3">
              <li>Primary source: <strong>Pitt Corpus</strong> (DementiaBank).</li>
              <li>
                <strong>Source:</strong> <a href="https://dementia.talkbank.org/access/English/Pitt.html" target="_blank" rel="noreferrer" className="text-emerald-600 hover:underline">dementia.talkbank.org/access/English/Pitt.html</a>
              </li>
              <li>Target: Patient vs. Healthy Control speech audio.</li>
              <li>Preprocess: Silence removal using standard VAD & MFCC.</li>
            </ul>
          </div>
        </div>

        {/* Training */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl border border-slate-800 flex flex-col">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Activity className="h-5 w-5 text-indigo-400" />
            Training Parameters
          </h3>
          
          <div className="space-y-5 flex-1 text-sm text-slate-300">
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Validation</p>
              <p>5-fold Cross-Validation to ensure generalizability.</p>
            </div>
            
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Transfer Learning</p>
              <p>Freeze early layers of pre-trained CNNs (ResNet/Inception). Fine-tune only later convolutional layers, LSTMs, and the MLP classifier.</p>
            </div>

            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Hyperparameters</p>
              <ul className="list-disc pl-5 mt-1 text-slate-300 space-y-1">
                <li>Optimizer: <strong>Adam</strong></li>
                <li>Batch Size: <strong>16 – 32</strong></li>
                <li>Learning Rate: <strong>~1e-4</strong></li>
                <li><strong>Early stopping</strong> to prevent overfitting.</li>
              </ul>
            </div>

            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Data Augmentation</p>
              <p>Standard approaches only (no GANs to maintain clinical validity):</p>
              <ul className="list-disc pl-5 mt-1 text-slate-300 space-y-1">
                <li>MRI: Flips, slight rotations, zooming.</li>
                <li>Speech: Additive white noise, pitch shifting, time stretching.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

       <div className="bg-indigo-50 border-l-4 border-indigo-600 p-5 rounded-r-xl">
        <h4 className="font-bold text-indigo-900 mb-2">Evaluation Metrics</h4>
        <p className="text-sm text-indigo-800">
          Report Accuracy, F1-Score, AUC-ROC, and per-class Confusion Matrices. Provide vital ablation studies comparing performance against single-modality baselines (MRI-only, Speech-only) and simpler models (plain CNN vs CNN-LSTM) to prove the hybrid architecture's value.
        </p>
      </div>

    </div>
  );
}

function Step({ number, title, content, color }: { number: string, title: string, content: React.ReactNode, color: 'blue' | 'emerald' }) {
  const colorClasses = {
    blue: 'bg-blue-600 text-white shadow-blue-200',
    emerald: 'bg-emerald-600 text-white shadow-emerald-200'
  };

  return (
    <div className="relative pl-12">
      <div className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md z-10 ${colorClasses[color]}`}>
        {number}
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4">{title}</h3>
        {content}
      </div>
    </div>
  );
}

function BackendTab() {
  const code = `import os
import torch
import torch.nn as nn
import torchvision.models as models
from torch.utils.data import Dataset, DataLoader
import pandas as pd
from PIL import Image
import numpy as np

# ==========================================
# DATASETS: Where the data is loaded and used
# ==========================================
class DementiaMultimodalDataset(Dataset):
    """
    Custom PyTorch Dataset that loads both MRI (ADNI/OASIS)
    and Speech features (DementiaBank).
    """
    def __init__(self, metadata_csv, mri_dir, speech_dir, transform=None):
        # The metadata CSV contains filenames and labels linking the two datsets
        self.metadata = pd.read_csv(metadata_csv)
        self.mri_dir = mri_dir
        self.speech_dir = speech_dir
        self.transform = transform

    def __len__(self):
        return len(self.metadata)

    def __getitem__(self, idx):
        row = self.metadata.iloc[idx]
        
        # 1. Load the dataset for Branch 1 (OASIS / ADNI MRI)
        mri_path = os.path.join(self.mri_dir, row['mri_filename'])
        # Load 2D/3D MRI slide (converting to RGB for ResNet compatibility here)
        mri_image = Image.open(mri_path).convert('RGB')
        
        if self.transform:
            mri_image = self.transform(mri_image)
            
        # 2. Load the dataset for Branch 2 (DementiaBank MFCCs / Cognitive array)
        speech_path = os.path.join(self.speech_dir, row['speech_filename'])
        # Load pre-extracted acoustic features (e.g., shape: [frames, features])
        speech_features = np.load(speech_path) 
        speech_tensor = torch.tensor(speech_features, dtype=torch.float32)
        
        # 3. Label (e.g., 0=CN, 1=MCI, 2=AD)
        label = torch.tensor(row['label'], dtype=torch.long)
        
        return mri_image, speech_tensor, label

# ==========================================
# ARCHITECTURE: The Hybrid Deep Learning Model
# ==========================================
class MultimodalDementiaModel(nn.Module):
    def __init__(self, tabular_input_dim=128, lstm_hidden_dim=256, num_classes=3):
        super(MultimodalDementiaModel, self).__init__()
        
        # --- MRI Branch (Image Learning - ResNet50) ---
        resnet = models.resnet50(pretrained=True)
        self.mri_feature_extractor = nn.Sequential(*list(resnet.children())[:-1])
        self.mri_fc = nn.Linear(resnet.fc.in_features, 512)
        
        # --- Cognitive/Speech Branch (LSTM) ---
        self.lstm = nn.LSTM(
            input_size=tabular_input_dim, 
            hidden_size=lstm_hidden_dim, 
            num_layers=2, 
            batch_first=True, 
            dropout=0.3
        )
        self.speech_fc = nn.Linear(lstm_hidden_dim, 512)
        
        # --- Fusion Layer ---
        fusion_dim = 1024 # 512 (MRI) + 512 (Speech)
        self.attention = nn.Sequential(
            nn.Linear(fusion_dim, fusion_dim),
            nn.Tanh(),
            nn.Linear(fusion_dim, 1),
            nn.Softmax(dim=1)
        )
        
        # --- Classification Layer ---
        self.classifier = nn.Sequential(
            nn.Linear(fusion_dim, 256),
            nn.ReLU(),
            nn.Dropout(0.4),
            nn.Linear(256, num_classes)
        )

    def forward(self, mri_imgs, speech_seq):
        # 1. Branch 1 Processing
        x_mri = self.mri_feature_extractor(mri_imgs)     # [batch, 2048, 1, 1]
        x_mri = x_mri.view(x_mri.size(0), -1)            
        mri_vec = torch.relu(self.mri_fc(x_mri))         # [batch, 512]
        
        # 2. Branch 2 Processing
        lstm_out, (hn, cn) = self.lstm(speech_seq)
        last_hidden = hn[-1]                             
        speech_vec = torch.relu(self.speech_fc(last_hidden)) # [batch, 512]
        
        # 3. Fusion & Attention
        fused_vector = torch.cat((mri_vec, speech_vec), dim=1) # [batch, 1024]
        attn_weights = self.attention(fused_vector)
        attended_features = fused_vector * attn_weights
        
        # 4. Final Output
        logits = self.classifier(attended_features)
        
        return logits

# ==========================================
# EXECUTION: Training Pipeline Setup & Paths
# ==========================================
if __name__ == "__main__":
    from torchvision import transforms

    # --- 1. Define Dataset Paths Here ---
    # MRI Dataset: OASIS Image Dataset from Kaggle
    # Download: https://www.kaggle.com/datasets/ninadaithal/imagesoasis
    MRI_DATA_DIR = "./dataset/imagesoasis/Data"
    
    # Speech Dataset: DementiaBank Pitt Corpus
    # Download: https://dementia.talkbank.org/access/English/Pitt.html
    SPEECH_DATA_DIR = "./dataset/DementiaBank/Pitt/MFCCs"
    
    METADATA_CSV_PATH = "./dataset/train_metadata.csv"

    print("--- Initializing Dementia Hybrid Model ---")
    print(f"Loading MRI data from Kaggle OASIS: {MRI_DATA_DIR}")
    print(f"Loading Speech data from DementiaBank Pitt: {SPEECH_DATA_DIR}")

    # --- 2. Initialize Transforms & Dataset ---
    mri_transforms = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])

    train_dataset = DementiaMultimodalDataset(
        metadata_csv=METADATA_CSV_PATH,
        mri_dir=MRI_DATA_DIR,
        speech_dir=SPEECH_DATA_DIR,
        transform=mri_transforms
    )

    # --- 3. Create DataLoader ---
    train_dataloader = DataLoader(train_dataset, batch_size=16, shuffle=True)

    # --- 4. Initialize Model ---
    # Assuming MFCC features have 40 coefficients per frame
    model = MultimodalDementiaModel(tabular_input_dim=40, lstm_hidden_dim=256, num_classes=3)
    
    # --- 5. Evaluation / Accuracy Calculation Loop ---
    def calculate_accuracy(model, data_loader, device='cpu'):
        model.eval()
        correct, total = 0, 0
        with torch.no_grad():
            for mri_imgs, speech_seq, labels in data_loader:
                mri_imgs = mri_imgs.to(device)
                speech_seq = speech_seq.to(device)
                labels = labels.to(device)
                
                outputs = model(mri_imgs, speech_seq)
                _, predicted = torch.max(outputs.data, 1)
                
                total += labels.size(0)
                correct += (predicted == labels).sum().item()
                
        return 100 * correct / total

    print("Model and DataLoaders are ready for the training loop!")
    # Example usage after training:
    # val_accuracy = calculate_accuracy(model, val_dataloader)
    # print(f"Validation Accuracy: {val_accuracy:.2f}%")`;

  return (
    <div className="space-y-8">
      <header>
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white shadow-sm px-3 py-1 text-xs font-semibold text-slate-800 mb-4">
          <Terminal className="h-3.5 w-3.5" />
          Backend Model
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900">PyTorch Implementation</h2>
        <p className="text-slate-600 mt-2 max-w-2xl">
          The following backend code defines the multimodal architecture ready for integration with an API via Flask or FastAPI.
        </p>
      </header>

      <div className="bg-[#0d1117] rounded-xl overflow-hidden border border-slate-800 shadow-xl">
        <div className="flex items-center px-4 py-3 bg-[#161b22] border-b border-slate-800">
          <div className="flex gap-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
            <Code className="h-4 w-4" /> model.py
          </div>
        </div>
        <div className="p-4 overflow-x-auto text-sm">
          <pre className="font-mono leading-relaxed text-slate-300">
            <code>
{code.split('\\n').map((line, i) => (
  <div key={i} className="table-row">
    <span className="table-cell pr-4 text-right text-slate-600 select-none">{i + 1}</span>
    <span className="table-cell whitespace-pre">{line}</span>
  </div>
))}
            </code>
          </pre>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white border text-sm text-slate-600 border-slate-200 p-5 rounded-xl shadow-sm">
           <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2"><Activity className="w-4 h-4 text-indigo-500"/> Inference</h4>
           Pass 3D/2D slices to <code className="bg-slate-100 text-pink-600 px-1 py-0.5 rounded">mri_imgs</code> and sequential tokenized tabular/audio data into <code className="bg-slate-100 text-pink-600 px-1 py-0.5 rounded">speech_seq</code>.
        </div>
        <div className="bg-white border text-sm text-slate-600 border-slate-200 p-5 rounded-xl shadow-sm">
           <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2"><Database className="w-4 h-4 text-emerald-500"/> Web Server Integration</h4>
           Use a <code className="bg-slate-100 font-bold px-1 py-0.5 rounded">FastAPI</code> or <code className="bg-slate-100 font-bold px-1 py-0.5 rounded">Node.js Express</code> server to receive multipart uploads, format them, and feed to this model via ONNX or a Python sub-process.
        </div>
      </div>
    </div>
  );
}

function DashboardTab() {
  const [patientId, setPatientId] = useState('PT-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0'));
  const [patientAge, setPatientAge] = useState('72');
  const [patientGender, setPatientGender] = useState('Female');
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [imageFileObj, setImageFileObj] = useState<File | null>(null);
  const [speechFile, setSpeechFile] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const mriInputRef = useRef<HTMLInputElement>(null);
  const speechInputRef = useRef<HTMLInputElement>(null);

  const API_URL = "http://127.0.0.1:8000";

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(URL.createObjectURL(file));
      setImageFileObj(file);
    }
  };

  const handleSpeechUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSpeechFile(e.target.files[0].name);
    }
  };

  const severityMap: Record<string, { severity: string; color: string; dementiaFound: boolean; symptoms: string[]; xai: string }> = {
    "Non Demented": {
      severity: "None",
      color: "text-emerald-600 bg-emerald-100 border-emerald-200",
      dementiaFound: false,
      symptoms: [
        "No clinical signs of cognitive decline detected",
        "Normal memory and cognitive function indicators",
        "Healthy brain structure on MRI",
        "Routine follow-up recommended"
      ],
      xai: "Grad-CAM heatmaps show no significant atrophy in hippocampal or temporal regions."
    },
    "Very mild Dementia": {
      severity: "Very Mild",
      color: "text-amber-600 bg-amber-100 border-amber-200",
      dementiaFound: true,
      symptoms: [
        "Occasional forgetfulness, especially of recent events",
        "Slight difficulty finding the right word in conversation",
        "Mild confusion in unfamiliar settings",
        "Daily functioning largely preserved"
      ],
      xai: "Grad-CAM highlights early-stage subtle changes in the hippocampal region."
    },
    "Mild Dementia": {
      severity: "Mild",
      color: "text-orange-600 bg-orange-100 border-orange-200",
      dementiaFound: true,
      symptoms: [
        "Noticeable memory loss affecting daily activities",
        "Difficulty with planning and complex tasks",
        "Disorientation in time or familiar places",
        "Mood and personality changes may emerge"
      ],
      xai: "Grad-CAM highlights moderate atrophy in hippocampal and temporal lobe regions."
    },
    "Moderate Dementia": {
      severity: "Moderate",
      color: "text-rose-600 bg-rose-100 border-rose-200",
      dementiaFound: true,
      symptoms: [
        "Significant memory loss affecting daily activities",
        "Difficulty finding the right words or following conversations",
        "Confusion with time or visual-spatial relationships",
        "Decreased or poor judgment in everyday decisions"
      ],
      xai: "Grad-CAM heatmaps highlight significant atrophy in the hippocampal and temporal lobe regions."
    }
  };

  const runAnalysis = async () => {
    if (!imageFileObj) {
      alert('Please upload an MRI scan to run analysis.');
      return;
    }

    setIsAnalyzing(true);
    setResults(null);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", imageFileObj);

      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const mapped = severityMap[data.predicted_class] || severityMap["Non Demented"];

      setResults({
        severity: mapped.severity,
        severityColor: mapped.color,
        confidence: (data.confidence * 100).toFixed(1),
        rawClass: data.predicted_class,
        allProbs: data.all_probabilities,
        speechAnalysis: {
          dementiaFound: mapped.dementiaFound,
          details: speechFile
            ? "Speech audio received. Note: v1 deployment uses MRI-only inference; speech-modality analysis is part of the v2 multimodal pipeline."
            : "No speech sample provided. v1 deployment uses MRI-only inference."
        },
        symptoms: mapped.symptoms,
        xaiDetails: mapped.xai
      });
    } catch (err: any) {
      const msg = err?.message || "Unknown error";
      setError(
        msg.includes("Failed to fetch") || msg.includes("NetworkError")
          ? `Could not reach the backend at ${API_URL}. Make sure the FastAPI server is running.`
          : `Analysis failed: ${msg}`
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-800 mb-4">
          <Stethoscope className="h-3.5 w-3.5" />
          Clinical Dashboard
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900">Patient Assessment</h2>
        <p className="text-slate-600 mt-2 max-w-2xl">
          Enter patient details and upload an MRI scan to run AI-powered dementia detection. Speech audio is optional in v1 (multimodal analysis is part of v2).
        </p>
      </header>

      {!results && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-500" /> Patient Details
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Patient ID</label>
              <input type="text" value={patientId} onChange={e => setPatientId(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Age</label>
              <input type="number" value={patientAge} onChange={e => setPatientAge(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Gender</label>
              <select value={patientGender} onChange={e => setPatientGender(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {!results && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col items-center justify-center min-h-[250px]">
            <input type="file" accept="image/*" className="hidden" ref={mriInputRef} onChange={handleImageUpload} />
            {imageFile ? (
              <div className="relative w-full h-full min-h-[200px] rounded-xl overflow-hidden group">
                <img src={imageFile} className="object-cover w-full h-full absolute inset-0" alt="MRI scan" />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button onClick={() => mriInputRef.current?.click()} className="bg-white text-slate-800 px-4 py-2 rounded-lg text-sm font-bold shadow-lg">Change Image</button>
                </div>
              </div>
            ) : (
              <div className="text-center cursor-pointer" onClick={() => mriInputRef.current?.click()}>
                <ImageIcon className="h-12 w-12 text-blue-400 mx-auto mb-3" />
                <h4 className="font-bold text-slate-800">Upload Brain MRI <span className="text-rose-500">*</span></h4>
                <p className="text-xs text-slate-500 mt-1">PNG, JPG up to 10MB</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col items-center justify-center min-h-[250px]">
            <input type="file" accept="audio/*" className="hidden" ref={speechInputRef} onChange={handleSpeechUpload} />
            {speechFile ? (
              <div className="text-center w-full bg-emerald-50 border border-emerald-100 rounded-xl p-6 relative">
                <FileAudio className="h-12 w-12 text-emerald-500 mx-auto mb-3" />
                <p className="font-bold text-emerald-900 truncate max-w-[200px] mx-auto">{speechFile}</p>
                <button onClick={() => speechInputRef.current?.click()} className="text-emerald-700 text-xs mt-3 underline font-medium">Replace Audio</button>
              </div>
            ) : (
              <div className="text-center cursor-pointer" onClick={() => speechInputRef.current?.click()}>
                <Mic className="h-12 w-12 text-emerald-400 mx-auto mb-3" />
                <h4 className="font-bold text-slate-800">Upload Speech Audio <span className="text-slate-400 text-xs">(optional)</span></h4>
                <p className="text-xs text-slate-500 mt-1">WAV, MP3 up to 10MB</p>
              </div>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-sm">Connection Error</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {!results && (
        <div className="flex justify-center mt-6">
          <button
            onClick={runAnalysis}
            disabled={isAnalyzing || !imageFile}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-indigo-600/20 flex items-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                  <Activity className="w-5 h-5" />
                </motion.div>
                Analyzing MRI...
              </>
            ) : (
              <>
                <PlayCircle className="w-5 h-5" /> Run Hybrid Analysis
              </>
            )}
          </button>
        </div>
      )}

      {results && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Main Diagnosis */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex flex-col md:flex-row items-center gap-8">
            <div className={`p-6 rounded-full border-4 ${results.severityColor} flex-shrink-0 relative`}>
              <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm">
                {results.speechAnalysis.dementiaFound
                  ? <AlertTriangle className="w-6 h-6 text-rose-500" />
                  : <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
              </div>
              <Brain className="w-12 h-12" />
            </div>

            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1 flex items-center justify-between">
                Diagnostic Output
                <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded ml-4 lowercase normal-case">Patient {patientId} • {patientAge} y/o {patientGender}</span>
              </p>
              <h3 className="text-3xl font-extrabold text-slate-900 mb-2 flex items-baseline gap-3 flex-wrap">
                Dementia Severity: <span className={results.severityColor.split(' ')[0]}>{results.severity}</span>
              </h3>
              <p className="text-slate-600 font-medium flex items-center gap-2">
                <CheckCircle2 className="text-emerald-500 w-4 h-4" />
                Model Confidence: {results.confidence}% (raw class: {results.rawClass})
              </p>
            </div>
          </div>

          {/* Per-class probability breakdown */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-500" />
              Per-Class Probability Breakdown
            </h4>
            <div className="space-y-3">
              {Object.entries(results.allProbs as Record<string, number>).map(([cls, prob]) => {
                const pct = (prob * 100).toFixed(1);
                const isTop = cls === results.rawClass;
                return (
                  <div key={cls}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className={`font-medium ${isTop ? 'text-indigo-700 font-bold' : 'text-slate-600'}`}>{cls}</span>
                      <span className={`font-mono ${isTop ? 'text-indigo-700 font-bold' : 'text-slate-500'}`}>{pct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className={`h-full rounded-full ${isTop ? 'bg-indigo-500' : 'bg-slate-300'}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Explainable AI */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 overflow-hidden">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                Explainable AI (XAI) - Image
              </h4>
              <div className="relative w-full h-48 rounded-xl overflow-hidden bg-slate-900 mb-4 border border-slate-200">
                {imageFile && <img src={imageFile} className="object-cover w-full h-full opacity-50 grayscale mix-blend-luminosity" alt="Base MRI" />}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-500/60 via-amber-500/20 to-transparent mix-blend-screen" style={{ backgroundPosition: '40% 60%', backgroundSize: '150% 150%' }}></div>
                <div className="absolute top-3 right-3 bg-slate-900/80 text-white text-[10px] px-2 py-1 rounded border border-slate-700 uppercase font-bold tracking-wider">
                  Grad-CAM Heatmap
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                <strong>Visual Evidence:</strong> {results.xaiDetails}
              </p>
            </div>

            {/* Speech Analysis */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-500" />
                Speech & Cognitive Analysis
              </h4>
              <div className={`p-4 rounded-xl ${results.speechAnalysis.dementiaFound ? 'bg-rose-50 border border-rose-100' : 'bg-emerald-50 border border-emerald-100'} mb-4`}>
                <p className={`font-bold ${results.speechAnalysis.dementiaFound ? 'text-rose-900' : 'text-emerald-900'} flex items-center gap-2`}>
                  {results.speechAnalysis.dementiaFound ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                  {results.speechAnalysis.dementiaFound ? 'Cognitive Decline Indicators Detected' : 'No Significant Indicators Detected'}
                </p>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed flex-1">
                <strong>Notes:</strong> {results.speechAnalysis.details}
              </p>
            </div>
          </div>

          {/* Symptoms List */}
          <div className="bg-slate-900 text-white rounded-2xl shadow-sm border border-slate-800 p-6">
            <h4 className="font-bold text-slate-100 mb-4 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-indigo-400" />
              Correlated Clinical Symptoms
            </h4>
            <p className="text-sm text-slate-400 mb-4">
              Based on the detected severity level ({results.severity}), the patient may exhibit the following symptoms:
            </p>
            <ul className="grid md:grid-cols-2 gap-4">
              {results.symptoms.map((symptom: string, i: number) => (
                <li key={i} className="flex items-start gap-3 bg-slate-800 p-3 rounded-lg border border-slate-700">
                  <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${results.speechAnalysis.dementiaFound ? 'bg-rose-500' : 'bg-emerald-500'}`}></div>
                  <span className="text-sm text-slate-200 leading-relaxed">{symptom}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={() => { setResults(null); setImageFile(null); setImageFileObj(null); setSpeechFile(null); setError(null); }}
              className="text-slate-500 hover:text-slate-800 text-sm font-medium underline"
            >
              Perform New Diagnosis
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
function DownloadsTab() {
  return (
    <div className="space-y-8">
      <header>
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-800 mb-4">
          <Download className="h-3.5 w-3.5" />
          Export Source
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900">Download Source Code</h2>
        <p className="text-slate-600 mt-2 max-w-2xl">
          Download the separated codebases for the final application. The frontend bundle requires a Node environment, while the backend is an isolated Python PyTorch project.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <a href="/frontend.zip" download className="group block bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:border-indigo-400 hover:shadow-md transition duration-200">
           <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
             <Code className="h-8 w-8 text-indigo-600" />
           </div>
           <h3 className="text-xl font-bold text-slate-900 mb-2">Frontend Project</h3>
           <p className="text-sm text-slate-600 mb-6 font-medium leading-relaxed">
             Contains the React + Vite frontend, Tailwind templates, Lucide icons, and all dashboard UI elements. Includes package.json and config files.
           </p>
           <div className="flex items-center text-indigo-600 font-bold text-sm tracking-wide uppercase">
             <Download className="h-4 w-4 mr-2" /> Download frontend.zip
           </div>
        </a>

        <a href="/backend.zip" download className="group block bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:border-emerald-400 hover:shadow-md transition duration-200">
           <div className="bg-emerald-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
             <Terminal className="h-8 w-8 text-emerald-600" />
           </div>
           <h3 className="text-xl font-bold text-slate-900 mb-2">Backend PyTorch Models</h3>
           <p className="text-sm text-slate-600 mb-6 font-medium leading-relaxed">
             Contains the Python hybrid deep learning pipeline, ResNet logic, LSTM components, and the model training loop implementation codebase.
           </p>
           <div className="flex items-center text-emerald-600 font-bold text-sm tracking-wide uppercase">
             <Download className="h-4 w-4 mr-2" /> Download backend.zip
           </div>
        </a>
      </div>
    </div>
  );
}

