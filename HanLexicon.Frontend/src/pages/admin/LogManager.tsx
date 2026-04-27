import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Terminal, Search, RefreshCw, AlertCircle, Info, Bug, Filter, 
  ChevronLeft, ChevronRight, Clock, User, Database, Globe, 
  ExternalLink, Copy, Check, FilterX, Code, Activity, Calendar
} from 'lucide-react';
import { adminService } from '@/src/services/api';
import { cn } from '@/lib/utils';
import { dateUtils } from '@/src/utils/formatters';

export default function LogManager() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [expandedLog, setExpandedLog] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await adminService.adminGetLogs({
        page,
        pageSize: 50,
        search: searchTerm,
        level: selectedLevel,
        fromDate: fromDate || null,
        toDate: toDate || null
      }) as any;
      if (res.isSuccess) {
        setLogs(res.data.items);
        setTotalPages(res.data.totalPages);
        setTotalItems(res.data.totalItems);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, selectedLevel, fromDate, toDate]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchData();
  };

  const setTimePreset = (preset: string) => {
    const now = new Date();
    let from = new Date();
    
    switch(preset) {
      case 'today':
        from.setHours(0,0,0,0);
        break;
      case 'yesterday':
        from.setDate(now.getDate() - 1);
        from.setHours(0,0,0,0);
        const toYest = new Date();
        toYest.setDate(now.getDate() - 1);
        toYest.setHours(23,59,59,999);
        setFromDate(from.toISOString().split('T')[0]);
        setToDate(toYest.toISOString().split('T')[0]);
        return;
      case 'week':
        from.setDate(now.getDate() - 7);
        break;
      case 'month':
        from.setMonth(now.getMonth() - 1);
        break;
      default:
        setFromDate('');
        setToDate('');
        return;
    }
    
    setFromDate(from.toISOString().split('T')[0]);
    setToDate(now.toISOString().split('T')[0]);
    setPage(1);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getLevelConfig = (level: string) => {
    const l = level?.toUpperCase();
    switch(l) {
      case 'ERROR': 
      case 'ERR': 
        return { 
          color: "text-rose-400", 
          bg: "bg-rose-400/10", 
          border: "border-rose-400/20", 
          icon: <AlertCircle className="w-4 h-4" /> 
        };
      case 'WARNING': 
      case 'WRN': 
        return { 
          color: "text-amber-400", 
          bg: "bg-amber-400/10", 
          border: "border-amber-400/20", 
          icon: <Bug className="w-4 h-4" /> 
        };
      default: 
        return { 
          color: "text-emerald-400", 
          bg: "bg-emerald-400/10", 
          border: "border-emerald-400/20", 
          icon: <Info className="w-4 h-4" /> 
        };
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] gap-4 animate-in fade-in duration-500">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-[1.5rem] border border-brand-border shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-brand-ink rounded-2xl flex items-center justify-center shadow-lg shadow-brand-ink/10">
            <Terminal className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-xl font-black text-brand-ink tracking-tight uppercase italic font-heading flex items-center gap-2">
              System Observer
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </h1>
            <p className="text-[10px] font-bold text-brand-secondary flex items-center gap-2 uppercase tracking-widest">
              <Activity className="w-3 h-3" /> Real-time database streams
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center bg-brand-highlight/30 px-4 py-2 rounded-xl border border-brand-border gap-4">
            <div className="text-center">
              <p className="text-[8px] font-black text-slate-400 uppercase">Total Entries</p>
              <p className="text-sm font-black text-brand-ink">{totalItems.toLocaleString()}</p>
            </div>
            <div className="w-px h-6 bg-brand-border" />
            <div className="text-center">
              <p className="text-[8px] font-black text-slate-400 uppercase">Current Page</p>
              <p className="text-sm font-black text-brand-ink">{page}/{totalPages}</p>
            </div>
          </div>
          <Button onClick={fetchData} variant="outline" className="h-11 rounded-xl border-2 hover:bg-brand-highlight gap-2 font-bold">
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin text-brand-primary")} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="flex flex-1 gap-4 overflow-hidden">
        {/* Sidebar Filters */}
        <div className="hidden xl:flex flex-col w-72 gap-4 overflow-y-auto pr-2 pb-4">
          <Card className="p-5 border-brand-border bg-white rounded-[1.5rem] shadow-sm flex flex-col gap-6">
            {/* Severity Filter */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Filter className="w-3 h-3" /> Severity Filter
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: '', label: 'All', icon: <FilterX className="w-3.5 h-3.5" />, color: "bg-slate-400" },
                  { id: 'Information', label: 'Info', icon: <Info className="w-3.5 h-3.5" />, color: "bg-emerald-400" },
                  { id: 'Warning', label: 'Warn', icon: <Bug className="w-3.5 h-3.5" />, color: "bg-amber-400" },
                  { id: 'Error', label: 'Error', icon: <AlertCircle className="w-3.5 h-3.5" />, color: "bg-rose-400" },
                ].map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => setSelectedLevel(lvl.id)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-bold transition-all border-2",
                      selectedLevel === lvl.id 
                        ? "bg-brand-ink border-brand-ink text-white shadow-md" 
                        : "bg-white border-transparent text-brand-secondary hover:bg-brand-highlight/50 border-brand-border/30"
                    )}
                  >
                    <div className={cn("w-1.5 h-1.5 rounded-full", lvl.color)} />
                    {lvl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Filter */}
            <div className="pt-4 border-t border-brand-border space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Calendar className="w-3 h-3" /> Time Range
              </label>
              
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'today', label: 'Today' },
                  { id: 'yesterday', label: 'Yesterday' },
                  { id: 'week', label: '7 Days' },
                  { id: 'all', label: 'All Time' },
                ].map((p) => (
                  <Button 
                    key={p.id} 
                    variant="outline" 
                    size="sm" 
                    className="text-[10px] font-bold h-8 rounded-lg border-brand-border hover:bg-brand-highlight"
                    onClick={() => setTimePreset(p.id)}
                  >
                    {p.label}
                  </Button>
                ))}
              </div>

              <div className="space-y-3 pt-2">
                 <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-400 uppercase">From</p>
                    <input 
                      type="date" 
                      className="w-full bg-brand-highlight/30 border-2 border-transparent focus:border-brand-primary rounded-xl px-3 py-2 text-xs font-bold outline-none transition-all"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                 </div>
                 <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-400 uppercase">To</p>
                    <input 
                      type="date" 
                      className="w-full bg-brand-highlight/30 border-2 border-transparent focus:border-brand-primary rounded-xl px-3 py-2 text-xs font-bold outline-none transition-all"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                    />
                 </div>
                 {(fromDate || toDate) && (
                   <Button 
                    variant="ghost" 
                    className="w-full text-[10px] font-black text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                    onClick={() => { setFromDate(''); setToDate(''); }}
                   >
                     Clear Time Filter
                   </Button>
                 )}
              </div>
            </div>

            <div className="pt-4 border-t border-brand-border space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Clock className="w-3 h-3" /> Stream Insights
              </label>
              <div className="bg-brand-highlight/20 rounded-2xl p-4 space-y-4 border border-brand-border/50">
                <div className="space-y-1">
                  <p className="text-[8px] font-black text-slate-400 uppercase">Retention</p>
                  <p className="text-xs font-bold text-brand-ink">Last 30 Days</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[8px] font-black text-slate-400 uppercase">Status</p>
                  <div className="flex items-center gap-2">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <p className="text-xs font-bold text-brand-ink">Active Logging</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Log Area */}
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          {/* Search Box */}
          <Card className="p-2 border-brand-border bg-white rounded-2xl shadow-sm flex items-center">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-brand-primary transition-colors" />
              <form onSubmit={handleSearch}>
                <input
                  type="text" placeholder="Search by message, SQL keywords, endpoint or trace ID..."
                  className="w-full h-11 pl-12 pr-4 bg-transparent border-none rounded-xl font-bold text-sm focus:ring-0 outline-none placeholder:text-slate-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </form>
            </div>
            {selectedLevel && (
              <button 
                onClick={() => setSelectedLevel('')}
                className="mx-2 px-3 py-1 bg-brand-highlight rounded-lg text-[10px] font-bold text-brand-primary flex items-center gap-2 border border-brand-primary/10 hover:bg-brand-primary/10 transition-colors"
              >
                Level: {selectedLevel} <FilterX className="w-3 h-3" />
              </button>
            )}
          </Card>

          {/* Log Console */}
          <div className="flex-1 overflow-y-auto rounded-[1.5rem] border border-brand-border bg-brand-ink shadow-2xl relative custom-scrollbar">
             {loading && logs.length === 0 ? (
               <div className="absolute inset-0 flex items-center justify-center bg-brand-ink/50 backdrop-blur-sm z-10">
                 <RefreshCw className="w-10 h-10 animate-spin text-emerald-400 opacity-50" />
               </div>
             ) : null}

             <div className="divide-y divide-white/5 font-mono text-[11px]">
               {logs.length === 0 && !loading ? (
                 <div className="p-20 text-center text-slate-500 uppercase tracking-widest font-bold opacity-30">
                   No logs detected in the selected timeframe
                 </div>
               ) : logs.map((log, index) => {
                 const logKey = log.id || `log-${log.createdAt}-${index}`;
                 const config = getLevelConfig(log.logLevel);
                 const isExpanded = expandedLog === logKey;
                 
                 return (
                   <div key={logKey} className={cn(
                     "group transition-all hover:bg-white/5",
                     isExpanded ? "bg-white/[0.03]" : ""
                   )}>
                     {/* Compact Row */}
                     <div 
                        className="flex items-center gap-4 px-4 py-2.5 cursor-pointer select-none"
                        onClick={() => setExpandedLog(isExpanded ? null : logKey)}
                     >
                       <span className="text-slate-500 shrink-0 w-32 font-medium">
                         [{dateUtils.formatDate(log.createdAt, 'HH:mm:ss dd/MM')}]
                       </span>
                       
                       <span className={cn("shrink-0 w-24 px-2 py-0.5 rounded border text-[9px] font-black uppercase tracking-wider text-center flex items-center justify-center gap-1.5", config.bg, config.color, config.border)}>
                         {config.icon} {log.logLevel?.substring(0, 4)}
                       </span>

                       <div className="flex-1 flex items-center gap-3 overflow-hidden">
                          {log.requestMethod && (
                            <span className="shrink-0 bg-white/10 text-white px-1.5 py-0.5 rounded-[4px] text-[9px] font-black">
                              {log.requestMethod}
                            </span>
                          )}
                          <span className={cn(
                            "truncate font-medium transition-colors",
                            isExpanded ? "text-white" : "text-slate-300 group-hover:text-slate-100",
                            log.logLevel === 'Error' ? "text-rose-300/80" : ""
                          )}>
                            {log.message}
                          </span>
                       </div>

                       <div className="shrink-0 flex items-center gap-4 opacity-40 group-hover:opacity-100 transition-opacity">
                         {log.statusCode && (
                           <span className={cn(
                             "text-[9px] font-black px-1.5 py-0.5 rounded",
                             log.statusCode >= 400 ? "bg-rose-500 text-white" : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20"
                           )}>
                             {log.statusCode}
                           </span>
                         )}
                         <ChevronRight className={cn("w-4 h-4 text-slate-500 transition-transform", isExpanded && "rotate-90")} />
                       </div>
                     </div>

                     {/* Expanded Detail View */}
                     {isExpanded && (
                       <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-t border-white/5">
                            <div className="space-y-4">
                              <div className="space-y-1">
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                  <Clock className="w-3 h-3" /> Timestamp
                                </p>
                                <p className="text-slate-200 text-xs">{dateUtils.formatDate(log.createdAt, 'HH:mm:ss.SSS dd/MM/yyyy')}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                  <User className="w-3 h-3" /> Identity
                                </p>
                                <p className="text-emerald-400 text-xs font-bold">{log.userName || 'SYSTEM_ANONYMOUS'}</p>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div className="space-y-1">
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                  <Globe className="w-3 h-3" /> Request Context
                                </p>
                                <div className="flex items-center gap-2">
                                   <span className="bg-emerald-500 text-brand-ink px-1.5 py-0.5 rounded text-[9px] font-black">{log.requestMethod || 'N/A'}</span>
                                   <span className="text-slate-300 text-xs truncate max-w-[200px]">{log.requestPath || 'INTERNAL_PROC'}</span>
                                </div>
                              </div>
                              <div className="space-y-1">
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                  <Code className="w-3 h-3" /> Trace Identifier
                                </p>
                                <div className="flex items-center gap-2 group/id">
                                  <p className="text-slate-400 text-xs font-mono">{log.traceId || 'NO_TRACE'}</p>
                                  {log.traceId && (
                                    <button 
                                      onClick={() => copyToClipboard(log.traceId, logKey)}
                                      className="text-slate-500 hover:text-white transition-colors"
                                    >
                                      {copiedId === logKey ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col justify-end">
                               <Button variant="ghost" className="w-fit text-[10px] font-black text-emerald-400 hover:bg-emerald-400/10 gap-2 uppercase tracking-tighter">
                                 <ExternalLink className="w-3.5 h-3.5" /> Full Payload Insight
                               </Button>
                            </div>
                         </div>

                         <div className="space-y-6">
                            {log.exception && (
                              <div className="space-y-3">
                                <p className="text-[9px] font-black text-rose-400 uppercase tracking-widest flex items-center gap-2">
                                  <AlertCircle className="w-3.5 h-3.5" /> Exception Trace
                                </p>
                                <div className="bg-rose-950/30 p-6 rounded-2xl text-[11px] font-mono text-rose-300 border border-rose-500/20 leading-relaxed overflow-x-auto">
                                  {log.exception}
                                </div>
                              </div>
                            )}

                            {(log.message?.includes('SELECT') || log.message?.includes('INSERT') || log.message?.includes('UPDATE') || log.message?.includes('DELETE')) ? (
                               <div className="space-y-3">
                                 <p className="text-[9px] font-black text-sky-400 uppercase tracking-widest flex items-center gap-2">
                                   <Database className="w-3.5 h-3.5" /> Query Execution Plan
                                 </p>
                                 <div className="bg-sky-950/20 p-6 rounded-2xl text-[11px] font-mono text-sky-300 border border-sky-500/20 overflow-x-auto shadow-inner leading-relaxed">
                                   {log.message}
                                 </div>
                               </div>
                            ) : null}

                            {log.logEvent && (
                               <div className="space-y-3">
                                 <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                   <Globe className="w-3.5 h-3.5" /> Raw Log Event (Structured)
                                 </p>
                                 <pre className="bg-white/[0.02] p-6 rounded-2xl text-[10px] font-mono text-slate-400 overflow-x-auto border border-white/5 custom-scrollbar leading-relaxed">
                                   {(() => {
                                     try {
                                       return JSON.stringify(JSON.parse(log.logEvent), null, 2);
                                     } catch (e) {
                                       return log.logEvent;
                                     }
                                   })()}
                                 </pre>
                               </div>
                            )}
                         </div>
                       </div>
                     )}
                   </div>
                 );
               })}
             </div>
          </div>

          {/* Pagination Console */}
          <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-brand-border shadow-sm shrink-0">
             <div className="flex items-center gap-4">
               <p className="text-[10px] font-black text-brand-secondary uppercase tracking-widest">
                 Page <span className="text-brand-primary">{page}</span> of {totalPages}
               </p>
               <span className="text-slate-300">|</span>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
                 Showing {logs.length} entries this fetch
               </p>
             </div>
             <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  disabled={page === 1} 
                  onClick={() => { setPage(page - 1); setExpandedLog(null); }} 
                  className="rounded-xl border-brand-border h-9 px-3 gap-2 font-bold text-xs bg-white"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </Button>
                <Button 
                  variant="outline" 
                  disabled={page === totalPages} 
                  onClick={() => { setPage(page + 1); setExpandedLog(null); }} 
                  className="rounded-xl border-brand-border h-9 px-3 gap-2 font-bold text-xs bg-white"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </Button>
             </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
