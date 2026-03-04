import { useState, useEffect, useRef } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=IBM+Plex+Mono:wght@400;500&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --ink:#0C0C10;--ink2:#111115;--ink3:#18181E;--ink4:#1E1E26;
  --gold:#B8973A;--gold2:#D4AF55;--gold3:#F0CC77;
  --silver:#9AA3B2;--mist:#D8D4CA;--text:#EDEAE2;--text2:#8A8680;
  --green:#3DA87A;--green2:#5ECFA0;
  --serif:'Playfair Display',Georgia,serif;
  --sans:'DM Sans',system-ui,sans-serif;
  --mono:'IBM Plex Mono',monospace;
}
html{scroll-behavior:smooth;}
body{background:var(--ink);color:var(--text);font-family:var(--sans);overflow-x:hidden;-webkit-font-smoothing:antialiased;}
::selection{background:rgba(184,151,58,0.22);color:var(--gold3);}
::-webkit-scrollbar{width:3px;}
::-webkit-scrollbar-track{background:var(--ink);}
::-webkit-scrollbar-thumb{background:linear-gradient(var(--gold),var(--gold2));}

/* OTW BANNER */
.otw-banner{position:fixed;top:0;left:0;right:0;z-index:300;background:rgba(61,168,122,0.06);border-bottom:1px solid rgba(61,168,122,0.15);padding:7px 60px;display:flex;align-items:center;justify-content:center;gap:12px;}
.otw-dot{width:6px;height:6px;background:var(--green2);border-radius:50%;flex-shrink:0;animation:otw-pulse 2.4s ease-in-out infinite;}
@keyframes otw-pulse{0%,100%{box-shadow:0 0 0 0 rgba(94,207,160,0.5);}50%{box-shadow:0 0 0 5px rgba(94,207,160,0);}}
.otw-text{font-family:var(--mono);font-size:10px;letter-spacing:2px;color:var(--green2);text-transform:uppercase;}
.otw-div{width:1px;height:11px;background:rgba(94,207,160,0.2);}
.otw-chip{font-family:var(--mono);font-size:9px;letter-spacing:1.5px;color:var(--green);padding:2px 8px;border:1px solid rgba(61,168,122,0.22);text-transform:uppercase;}

/* NAV */
#nav{position:fixed;top:0;left:0;right:0;z-index:200;display:flex;align-items:center;justify-content:space-between;padding:20px 60px;transition:all 0.45s cubic-bezier(.22,1,.36,1);}
#nav.stuck{top:0;padding:13px 60px;background:rgba(11,11,15,0.95);backdrop-filter:blur(20px);border-bottom:1px solid rgba(184,151,58,0.1);}
.nav-brand{display:flex;align-items:center;gap:13px;text-decoration:none;}
.nav-name{font-family:var(--serif);font-size:16px;font-weight:500;color:var(--text);}
.nav-name small{display:block;font-size:9px;letter-spacing:2.5px;font-family:var(--mono);color:var(--gold);text-transform:uppercase;margin-top:3px;}
.nav-links{display:flex;gap:34px;list-style:none;align-items:center;}
.nav-links a{font-family:var(--sans);font-size:13px;font-weight:400;color:var(--silver);text-decoration:none;transition:color 0.25s;position:relative;padding-bottom:3px;}
.nav-links a::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:var(--gold);transition:width 0.3s;}
.nav-links a:hover{color:var(--gold2);}
.nav-links a:hover::after{width:100%;}
.nav-cta{font-family:var(--sans);font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--ink) !important;background:linear-gradient(135deg,var(--gold),var(--gold2));padding:9px 20px;text-decoration:none;transition:all 0.3s;}
.nav-cta:hover{filter:brightness(1.08);transform:translateY(-1px);box-shadow:0 6px 20px rgba(184,151,58,0.28);}
.nav-cta::after{display:none !important;}
.nav-avail{display:flex;align-items:center;gap:5px;font-family:var(--mono);font-size:9px;letter-spacing:1.5px;color:var(--green2);padding:4px 10px;border:1px solid rgba(61,168,122,0.25);background:rgba(61,168,122,0.05);text-transform:uppercase;}
.nav-avail-dot{width:5px;height:5px;background:var(--green2);border-radius:50%;flex-shrink:0;animation:otw-pulse 2.4s ease-in-out infinite;}
.nav-linkedin{display:flex;align-items:center;gap:5px;font-family:var(--sans);font-size:13px;color:var(--silver) !important;text-decoration:none;transition:color 0.25s;}
.nav-linkedin:hover{color:#0A66C2 !important;}
.nav-linkedin::after{display:none !important;}

/* HERO */
#hero{min-height:100vh;display:grid;grid-template-columns:1.05fr 0.95fr;align-items:center;padding:150px 60px 100px;position:relative;overflow:hidden;gap:64px;}
.hero-canvas{position:absolute;inset:0;z-index:0;pointer-events:none;width:100%;height:100%;}
.hero-glow{position:absolute;top:-10%;right:-5%;width:520px;height:520px;background:radial-gradient(circle,rgba(184,151,58,0.07) 0%,transparent 65%);pointer-events:none;z-index:0;}
.hero-left{position:relative;z-index:1;}
.hero-right{position:relative;z-index:1;display:flex;flex-direction:column;align-items:flex-end;}
.hero-eyebrow{display:flex;align-items:center;gap:12px;margin-bottom:24px;opacity:0;animation:riseIn 0.9s cubic-bezier(.22,1,.36,1) 0.15s forwards;}
.eyebrow-line{width:36px;height:1px;background:var(--gold);}
.eyebrow-text{font-family:var(--mono);font-size:10px;letter-spacing:3px;color:var(--gold);text-transform:uppercase;}
.hero-h1{font-family:var(--serif);font-size:clamp(46px,5.5vw,78px);font-weight:400;line-height:1.1;color:var(--text);margin-bottom:8px;opacity:0;animation:riseIn 0.9s cubic-bezier(.22,1,.36,1) 0.3s forwards;}
.hero-h1 em{font-style:italic;color:var(--gold2);}
.hero-h1-sub{font-size:clamp(14px,1.4vw,16px);font-weight:400;color:var(--text2);line-height:1.7;margin-bottom:26px;max-width:480px;opacity:0;animation:riseIn 0.9s cubic-bezier(.22,1,.36,1) 0.42s forwards;}
.hero-h1-sub strong{color:var(--mist);font-weight:500;}
.hero-typed-wrap{margin-bottom:26px;opacity:0;animation:riseIn 0.9s cubic-bezier(.22,1,.36,1) 0.52s forwards;}
.hero-typed{font-family:var(--serif);font-style:italic;font-size:clamp(18px,2.1vw,26px);color:var(--silver);}
.hero-typed .caret{display:inline-block;width:2px;height:0.85em;background:var(--gold);margin-left:3px;vertical-align:middle;animation:blink 1s step-end infinite;}
.hero-ticker-wrap{margin-bottom:34px;overflow:hidden;border-top:1px solid rgba(184,151,58,0.1);border-bottom:1px solid rgba(184,151,58,0.1);padding:9px 0;opacity:0;animation:riseIn 0.9s cubic-bezier(.22,1,.36,1) 0.6s forwards;}
.hero-ticker{display:flex;width:max-content;animation:ticker 34s linear infinite;}
.ticker-item{display:flex;align-items:center;gap:18px;padding:0 18px;white-space:nowrap;}
.ticker-label{font-family:var(--mono);font-size:9px;letter-spacing:2px;color:var(--text2);text-transform:uppercase;}
.ticker-dot{width:3px;height:3px;background:var(--gold);border-radius:50%;opacity:0.5;flex-shrink:0;}
@keyframes ticker{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
.hero-name-sub{font-family:var(--mono);font-size:10px;letter-spacing:1.8px;color:var(--gold);text-transform:uppercase;margin-bottom:18px;opacity:0;animation:riseIn 0.9s cubic-bezier(.22,1,.36,1) 0.28s forwards;}
.hero-tags{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:20px;opacity:0;animation:riseIn 0.9s cubic-bezier(.22,1,.36,1) 0.36s forwards;}
.htag{display:flex;align-items:center;gap:5px;font-family:var(--mono);font-size:9px;letter-spacing:1.2px;color:var(--silver);padding:4px 10px;border:1px solid rgba(154,163,178,0.15);background:rgba(154,163,178,0.04);text-transform:uppercase;}
.htag-open{color:var(--green2);border-color:rgba(61,168,122,0.2);background:rgba(61,168,122,0.04);}
.htag-gold{color:var(--gold2);border-color:rgba(184,151,58,0.25);background:rgba(184,151,58,0.05);}
.htag-blue{color:#6EB5FF;border-color:rgba(110,181,255,0.2);background:rgba(110,181,255,0.04);}
.htag-purple{color:#B07AFF;border-color:rgba(176,122,255,0.2);background:rgba(176,122,255,0.04);}
.htag-green{color:#5ECFA0;border-color:rgba(94,207,160,0.22);background:rgba(94,207,160,0.05);}
.htag-dot{width:5px;height:5px;background:var(--green2);border-radius:50%;flex-shrink:0;animation:otw-pulse 2.4s ease-in-out infinite;}
.htag-div{width:1px;height:10px;background:rgba(154,163,178,0.15);}
.hero-actions{display:flex;gap:12px;opacity:0;animation:riseIn 0.9s cubic-bezier(.22,1,.36,1) 0.72s forwards;flex-wrap:wrap;}
.btn-gold{padding:14px 34px;background:linear-gradient(135deg,var(--gold),var(--gold2));color:var(--ink);font-family:var(--sans);font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;border:none;cursor:pointer;text-decoration:none;display:inline-block;transition:all 0.3s;}
.btn-gold:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(184,151,58,0.32);filter:brightness(1.08);}
.btn-ghost{padding:13px 32px;background:transparent;color:var(--silver);font-family:var(--sans);font-size:12px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;border:1px solid rgba(154,163,178,0.25);cursor:pointer;text-decoration:none;display:inline-block;transition:all 0.3s;}
.btn-ghost:hover{border-color:var(--gold);color:var(--gold2);}

/* HERO PANEL — Interactive */
.hero-panel{width:360px;opacity:0;animation:fadeLeft 1s cubic-bezier(.22,1,.36,1) 0.55s forwards;}
.hp-header{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border:1px solid rgba(184,151,58,0.15);border-bottom:none;background:rgba(184,151,58,0.03);}
.hp-header-left{display:flex;align-items:center;gap:10px;}
.hp-header-title{font-family:var(--mono);font-size:9px;letter-spacing:2.5px;color:var(--gold);text-transform:uppercase;}
.hp-otw{display:flex;align-items:center;gap:5px;font-family:var(--mono);font-size:8px;letter-spacing:1.5px;color:var(--green2);padding:3px 8px;border:1px solid rgba(61,168,122,0.25);background:rgba(61,168,122,0.06);text-transform:uppercase;}
.hp-otw-dot{width:5px;height:5px;background:var(--green2);border-radius:50%;animation:otw-pulse 2.4s ease-in-out infinite;}
/* Skill bars panel */
.hp-body{border:1px solid rgba(184,151,58,0.12);background:var(--ink2);padding:18px 20px 14px;}
.hp-tab-row{display:flex;gap:2px;margin-bottom:16px;}
.hp-tab{flex:1;font-family:var(--mono);font-size:8px;letter-spacing:1px;padding:5px;text-align:center;text-transform:uppercase;border:1px solid rgba(184,151,58,0.12);background:transparent;color:var(--text2);cursor:pointer;transition:all 0.2s;}
.hp-tab.active{border-color:rgba(184,151,58,0.4);background:rgba(184,151,58,0.08);color:var(--gold);}
.hp-skill-row{display:flex;align-items:center;gap:10px;margin-bottom:11px;cursor:default;}
.hp-skill-row:last-child{margin-bottom:0;}
.hp-skill-name{font-family:var(--mono);font-size:8px;letter-spacing:0.8px;color:var(--silver);text-transform:uppercase;width:90px;flex-shrink:0;}
.hp-bar-track{flex:1;height:4px;background:rgba(184,151,58,0.1);position:relative;overflow:hidden;}
.hp-bar-fill{height:100%;background:linear-gradient(90deg,var(--gold),var(--gold2));transform-origin:left;transform:scaleX(0);transition:transform 0.8s cubic-bezier(.22,1,.36,1);}
.hp-bar-fill.show{transform:scaleX(1);}
.hp-bar-pct{font-family:var(--mono);font-size:8px;color:var(--gold2);width:26px;text-align:right;flex-shrink:0;}
.hp-skill-row:hover .hp-skill-name{color:var(--gold2);}
.hp-skill-row:hover .hp-bar-fill{filter:brightness(1.2);}
/* Tile panel */
.hp-tiles{display:grid;grid-template-columns:1fr 1fr;border:1px solid rgba(184,151,58,0.12);border-bottom:none;}
.hp-tile{padding:14px 16px;background:var(--ink2);border:none;border-right:1px solid rgba(184,151,58,0.08);border-bottom:1px solid rgba(184,151,58,0.08);cursor:pointer;text-align:left;transition:all 0.2s;display:flex;flex-direction:column;gap:3px;}
.hp-tile:nth-child(2n){border-right:none;}
.hp-tile:hover{background:rgba(184,151,58,0.04);}
.hp-tile-lbl{font-family:var(--mono);font-size:8.5px;letter-spacing:1.4px;color:var(--text2);text-transform:uppercase;transition:color 0.2s;line-height:1.3;}
.hp-tile-count{font-family:var(--mono);font-size:7.5px;letter-spacing:1px;color:var(--text2);opacity:0.45;text-transform:uppercase;transition:color 0.2s;}
/* Detail area */
.hp-detail{border:1px solid rgba(184,151,58,0.12);border-bottom:none;background:var(--ink2);padding:14px 18px;display:flex;flex-direction:column;gap:10px;min-height:90px;}
.hp-detail-item{display:flex;align-items:flex-start;gap:11px;animation:riseIn 0.28s ease both;}
.hp-detail-accent{width:2px;height:32px;border-radius:1px;flex-shrink:0;margin-top:2px;}
.hp-detail-content{display:flex;flex-direction:column;gap:3px;}
.hp-detail-title{font-family:var(--sans);font-size:12px;font-weight:500;color:var(--text);line-height:1.3;}
.hp-detail-tag{font-family:var(--mono);font-size:8px;letter-spacing:1px;color:var(--text2);text-transform:uppercase;}
.hp-footer{border:1px solid rgba(184,151,58,0.12);border-top:none;padding:11px 20px;background:rgba(184,151,58,0.02);display:flex;align-items:center;justify-content:space-between;}
.hp-footer-tag{font-family:var(--mono);font-size:7.5px;letter-spacing:1.5px;color:var(--text2);text-transform:uppercase;}
.hp-footer-dot{width:4px;height:4px;background:var(--gold);border-radius:50%;opacity:0.5;}
.hp-stats{display:grid;grid-template-columns:1fr 1fr;border:1px solid rgba(184,151,58,0.12);}
.hp-stat{padding:20px 18px;background:var(--ink2);border-right:1px solid rgba(184,151,58,0.08);border-bottom:1px solid rgba(184,151,58,0.08);transition:background 0.3s;}
.hp-stat:hover{background:rgba(184,151,58,0.04);}
.hp-stat:nth-child(2n){border-right:none;}
.hp-stat:nth-child(3),.hp-stat:nth-child(4){border-bottom:none;}
.hp-stat-val{font-family:var(--serif);font-size:30px;font-weight:600;color:var(--gold2);line-height:1;margin-bottom:5px;}
.hp-stat-lbl{font-family:var(--mono);font-size:8px;letter-spacing:1.8px;color:var(--text2);text-transform:uppercase;line-height:1.5;}
.hp-skills{border:1px solid rgba(184,151,58,0.12);border-top:none;padding:14px 16px;background:var(--ink2);display:flex;flex-wrap:wrap;gap:5px;}
.hp-skill{font-family:var(--mono);font-size:8px;letter-spacing:1px;color:var(--text2);padding:3px 8px;border:1px solid rgba(184,151,58,0.13);background:rgba(184,151,58,0.04);text-transform:uppercase;transition:all 0.25px;cursor:default;}
.hp-skill:hover{color:var(--gold2);border-color:rgba(184,151,58,0.32);}
.hp-model-tags{border:1px solid rgba(184,151,58,0.12);border-top:none;padding:10px 16px;background:var(--ink2);display:flex;flex-wrap:wrap;gap:5px;}
.hp-mtag{font-family:var(--mono);font-size:8px;letter-spacing:0.8px;padding:3px 8px;border-radius:2px;display:inline-flex;align-items:center;gap:4px;text-transform:uppercase;}
.hp-mtag-gold{color:#B8973A;border:1px solid rgba(184,151,58,0.25);background:rgba(184,151,58,0.06);}
.hp-mtag-blue{color:#6EB5FF;border:1px solid rgba(110,181,255,0.2);background:rgba(110,181,255,0.05);}
.hp-mtag-purple{color:#B07AFF;border:1px solid rgba(176,122,255,0.2);background:rgba(176,122,255,0.05);}
.hp-footer{border:1px solid rgba(184,151,58,0.12);border-top:none;padding:11px 16px;background:linear-gradient(135deg,rgba(184,151,58,0.06),rgba(184,151,58,0.02));display:flex;justify-content:flex-end;align-items:center;}

/* EXEC SUMMARY */
.exec-bg{background:var(--ink2);padding:80px 0;}
.exec-inner{max-width:1280px;margin:0 auto;padding:0 60px;}
.exec-grid{display:grid;grid-template-columns:1fr 1.6fr;gap:80px;align-items:start;}
.exec-label-col{}
.exec-label-eyebrow{display:flex;align-items:center;gap:12px;margin-bottom:16px;}
.exec-label-line{width:32px;height:1px;background:var(--gold);}
.exec-label-text{font-family:var(--mono);font-size:9px;letter-spacing:3px;color:var(--gold);text-transform:uppercase;}
.exec-label-title{font-family:var(--serif);font-size:clamp(28px,3vw,40px);font-weight:400;line-height:1.2;color:var(--text);margin-bottom:20px;}
.exec-label-title em{font-style:italic;color:var(--gold2);}
.exec-label-chips{display:flex;flex-wrap:wrap;gap:6px;}
.exec-chip{font-family:var(--mono);font-size:9px;letter-spacing:1.5px;color:var(--text2);padding:5px 11px;border:1px solid rgba(184,151,58,0.18);text-transform:uppercase;transition:all 0.25s;cursor:default;}
.exec-chip:hover{color:var(--gold2);border-color:rgba(184,151,58,0.4);background:rgba(184,151,58,0.05);}
.exec-content-col{}
.exec-statement{font-family:var(--serif);font-size:clamp(18px,2vw,24px);font-weight:400;font-style:italic;color:var(--mist);line-height:1.6;margin-bottom:28px;padding-left:20px;border-left:2px solid var(--gold);}
.exec-paras p{font-size:15px;line-height:1.9;color:var(--text2);margin-bottom:16px;}
.exec-paras strong{color:var(--mist);font-weight:500;}
.exec-value-row{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:32px;}
.exec-val-item{padding:18px 16px;background:var(--ink3);border:1px solid rgba(184,151,58,0.08);transition:all 0.3s;}
.exec-val-item:hover{background:rgba(184,151,58,0.04);border-color:rgba(184,151,58,0.2);}
.exec-val-icon{font-size:18px;margin-bottom:8px;display:block;}
.exec-val-title{font-family:var(--sans);font-size:13px;font-weight:500;color:var(--text);margin-bottom:4px;}
.exec-val-desc{font-family:var(--sans);font-size:11px;color:var(--text2);line-height:1.6;}

/* DIVIDERS */
.rule{display:flex;align-items:center;padding:0 60px;}
.rule-line{flex:1;height:1px;background:rgba(184,151,58,0.1);}
.rule-diamond{width:7px;height:7px;border:1px solid var(--gold);transform:rotate(45deg);margin:0 16px;background:rgba(184,151,58,0.1);flex-shrink:0;}

/* SECTIONS */
.section{padding:96px 60px;max-width:1280px;margin:0 auto;}
.sec-eye{display:flex;align-items:center;gap:14px;margin-bottom:14px;}
.sec-line{width:44px;height:1px;background:var(--gold);opacity:0.35;}
.sec-title{font-family:var(--serif);font-size:clamp(30px,3.6vw,48px);font-weight:400;line-height:1.12;color:var(--text);margin-bottom:10px;}
.sec-title em{font-style:italic;color:var(--gold2);}
.sec-sub{font-size:14px;font-weight:400;color:var(--text2);line-height:1.75;max-width:560px;margin-bottom:52px;}

/* ABOUT */
.about-grid{display:grid;grid-template-columns:1.1fr 0.9fr;gap:72px;align-items:start;}
.about-prose p{font-size:15px;line-height:1.9;color:var(--text2);margin-bottom:18px;}
.about-prose strong{color:var(--mist);font-weight:500;}
.about-note{display:flex;gap:10px;padding:12px 15px;background:rgba(61,168,122,0.05);border-left:2px solid var(--green);margin-top:6px;}
.about-note-text{font-family:var(--mono);font-size:9px;color:var(--green2);line-height:1.65;letter-spacing:0.3px;opacity:0.85;}
.about-items{display:flex;flex-direction:column;gap:2px;margin-top:24px;}
.about-item{padding:13px 15px;background:var(--ink2);border-left:2px solid rgba(184,151,58,0.18);display:flex;align-items:flex-start;gap:11px;transition:border-color 0.3s,background 0.3s;}
.about-item:hover{border-color:var(--gold);background:rgba(184,151,58,0.04);}
.about-dot{width:4px;height:4px;background:var(--gold);flex-shrink:0;margin-top:5px;}
.about-item-text{font-size:13px;color:var(--silver);line-height:1.6;}

/* COMPETENCY GRID */
.comp-bg{background:var(--ink2);padding:96px 0;}
.comp-inner{max-width:1280px;margin:0 auto;padding:0 60px;}
.comp-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;}
.comp-card{padding:28px 24px;background:var(--ink3);border:1px solid rgba(184,151,58,0.07);position:relative;overflow:hidden;transition:all 0.35s cubic-bezier(.22,1,.36,1);cursor:default;}
.comp-card::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent);opacity:0;transition:opacity 0.35s;}
.comp-card:hover{transform:translateY(-3px);border-color:rgba(184,151,58,0.22);background:rgba(184,151,58,0.03);}
.comp-card:hover::after{opacity:1;}
.comp-icon-wrap{margin-bottom:14px;display:block;line-height:0;}
.comp-icon{font-size:22px;margin-bottom:14px;display:block;}
.comp-title{font-family:var(--sans);font-size:13px;font-weight:600;color:var(--text);margin-bottom:8px;line-height:1.3;}
.comp-desc{font-size:12px;color:var(--text2);line-height:1.7;}
.comp-tag{display:inline-block;margin-top:12px;font-family:var(--mono);font-size:8px;letter-spacing:1.5px;color:var(--gold);text-transform:uppercase;opacity:0.7;}

/* SKILLS CHIPS */
.skills-col{display:flex;flex-direction:column;gap:22px;}
.skill-cat{font-family:var(--mono);font-size:9px;letter-spacing:3px;color:var(--gold);text-transform:uppercase;margin-bottom:10px;}
.chips{display:flex;flex-wrap:wrap;gap:6px;}
.chip{padding:5px 11px;border:1px solid rgba(154,163,178,0.15);font-family:var(--sans);font-size:11px;font-weight:400;color:var(--silver);transition:all 0.25s;cursor:default;}
.chip:hover{border-color:var(--gold);color:var(--gold2);background:rgba(184,151,58,0.05);}

/* EDGE */
.edge-bg{background:var(--ink);padding:96px 0;}
.edge-inner{max-width:1280px;margin:0 auto;padding:0 60px;}
.edge-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;}
.ecard{padding:40px 32px;background:var(--ink2);border:1px solid rgba(184,151,58,0.07);position:relative;overflow:hidden;transition:all 0.4s cubic-bezier(.22,1,.36,1);}
.ecard::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent);opacity:0;transition:opacity 0.4s;}
.ecard:hover::after{opacity:1;}
.ecard:hover{transform:translateY(-4px);border-color:rgba(184,151,58,0.18);}
.ecard-icon-wrap{margin-bottom:18px;display:block;line-height:0;}
.ecard-icon{font-size:24px;margin-bottom:18px;display:block;}
.ecard-title{font-family:var(--serif);font-size:19px;font-weight:500;color:var(--text);margin-bottom:11px;line-height:1.3;}
.ecard-title em{font-style:italic;color:var(--gold2);}
.ecard-body{font-size:13px;color:var(--text2);line-height:1.84;}
.ecard-body strong{color:var(--mist);font-weight:500;}
.ecard-tag{display:inline-block;margin-top:16px;font-family:var(--mono);font-size:9px;letter-spacing:2px;color:var(--gold);text-transform:uppercase;padding:4px 10px;border:1px solid rgba(184,151,58,0.22);background:rgba(184,151,58,0.04);}

/* PROJECT FILTER */
.proj-filter{display:flex;gap:2px;margin-bottom:28px;flex-wrap:wrap;}
.pf-btn{font-family:var(--mono);font-size:9px;letter-spacing:2px;text-transform:uppercase;padding:8px 18px;border:1px solid rgba(184,151,58,0.15);background:transparent;color:var(--text2);cursor:pointer;transition:all 0.25s;}
.pf-btn:hover{color:var(--gold2);border-color:rgba(184,151,58,0.35);}
.pf-btn.active{background:rgba(184,151,58,0.1);color:var(--gold2);border-color:rgba(184,151,58,0.4);}

/* PROJECTS */
.proj-bg{background:var(--ink2);padding:96px 0;}
.proj-inner{max-width:1280px;margin:0 auto;padding:0 60px;}
.proj-disclaimer{display:flex;gap:10px;padding:10px 15px;border:1px solid rgba(184,151,58,0.12);background:rgba(184,151,58,0.03);margin-bottom:28px;}
.proj-disclaimer-text{font-family:var(--mono);font-size:9px;letter-spacing:1px;color:var(--text2);line-height:1.7;}
.proj-disclaimer-text span{color:var(--gold);}
.proj-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:2px;}
.pcard{background:var(--ink3);padding:36px 32px;border:1px solid rgba(184,151,58,0.07);position:relative;overflow:hidden;transition:transform 0.4s cubic-bezier(.22,1,.36,1),border-color 0.4s;cursor:default;}
.pcard::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--gold),transparent);transform:scaleX(0);transform-origin:left;transition:transform 0.5s cubic-bezier(.22,1,.36,1);}
.pcard:hover::before{transform:scaleX(1);}
.pcard:hover{transform:translateY(-4px);border-color:rgba(184,151,58,0.2);}
.pcard.hidden{display:none;}
.pcard-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;}
.pcard-num{font-family:var(--mono);font-size:10px;color:var(--text2);letter-spacing:2px;}
.pcard-badge{font-family:var(--mono);font-size:8px;letter-spacing:1.2px;color:var(--green2);padding:3px 7px;border:1px solid rgba(61,168,122,0.22);background:rgba(61,168,122,0.05);text-transform:uppercase;white-space:nowrap;}
.pcard-badge.intern{color:var(--gold2);border-color:rgba(212,175,85,0.25);background:rgba(212,175,85,0.06);}
.ptags{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;}
.ptag{font-family:var(--mono);font-size:8px;font-weight:500;letter-spacing:1.8px;text-transform:uppercase;padding:3px 8px;border:1px solid;}
.t-fin{color:#C9A84C;border-color:rgba(201,168,76,0.28);background:rgba(201,168,76,0.06);}
.t-lbo{color:#FF9F6B;border-color:rgba(255,159,107,0.28);background:rgba(255,159,107,0.06);}
.t-auto{color:#6EB5FF;border-color:rgba(110,181,255,0.28);background:rgba(110,181,255,0.06);}
.t-ml{color:#B07AFF;border-color:rgba(176,122,255,0.28);background:rgba(176,122,255,0.06);}
.t-intern{color:#5ECFA0;border-color:rgba(94,207,160,0.28);background:rgba(94,207,160,0.06);}
.pcard-title{font-family:var(--serif);font-size:22px;font-weight:500;color:var(--text);line-height:1.22;margin-bottom:6px;}
.pcard-sub{font-family:var(--mono);font-size:10px;color:var(--gold);letter-spacing:0.8px;margin-bottom:12px;text-transform:uppercase;}
.pcard-desc{font-size:13px;color:var(--text2);line-height:1.82;margin-bottom:16px;}
.pmetrics{display:flex;gap:0;margin-bottom:14px;border:1px solid rgba(184,151,58,0.12);}
.pmet{padding:12px 16px;flex:1;min-width:0;background:var(--ink);border-right:1px solid rgba(184,151,58,0.1);position:relative;cursor:pointer;transition:background 0.25s;}
.pmet:last-child{border-right:none;}
.pmet:hover{background:rgba(184,151,58,0.06);}
.pmet-val{font-family:var(--serif);font-size:20px;font-weight:600;color:var(--gold2);line-height:1;display:block;}
.pmet-lbl{font-family:var(--mono);font-size:8px;letter-spacing:1.5px;color:var(--text2);text-transform:uppercase;margin-top:4px;display:block;}
.pmet-tooltip{position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateX(-50%);background:var(--ink4);border:1px solid rgba(184,151,58,0.25);padding:9px 13px;width:190px;z-index:50;pointer-events:none;opacity:0;transition:opacity 0.2s;}
.pmet:hover .pmet-tooltip{opacity:1;}
.pmet-tooltip-title{font-family:var(--mono);font-size:9px;letter-spacing:2px;color:var(--gold);text-transform:uppercase;margin-bottom:5px;}
.pmet-tooltip-body{font-size:11px;color:var(--text2);line-height:1.6;}
.pmet-tooltip::after{content:'';position:absolute;top:100%;left:50%;transform:translateX(-50%);border:5px solid transparent;border-top-color:rgba(184,151,58,0.25);}
.lbo-calc{background:var(--ink);border:1px solid rgba(184,151,58,0.15);padding:16px;margin:14px 0;}
.lbo-calc-title{font-family:var(--mono);font-size:9px;letter-spacing:2.5px;color:var(--gold);text-transform:uppercase;margin-bottom:14px;display:flex;align-items:center;gap:8px;}
.lbo-calc-badge{font-size:8px;padding:2px 6px;border:1px solid rgba(184,151,58,0.25);color:var(--text2);}
.lbo-inputs{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px;}
.lbo-input-group{display:flex;flex-direction:column;gap:5px;}
.lbo-input-label{font-family:var(--mono);font-size:8px;letter-spacing:1.5px;color:var(--text2);text-transform:uppercase;}
.lbo-slider{width:100%;-webkit-appearance:none;appearance:none;height:3px;background:rgba(184,151,58,0.2);outline:none;cursor:pointer;}
.lbo-slider::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:14px;background:var(--gold2);cursor:pointer;}
.lbo-slider::-moz-range-thumb{width:14px;height:14px;background:var(--gold2);cursor:pointer;border-radius:0;border:none;}
.lbo-slider-val{font-family:var(--serif);font-size:16px;font-weight:600;color:var(--gold2);}
.lbo-results{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;}
.lbo-result{padding:10px 12px;background:var(--ink2);border:1px solid rgba(184,151,58,0.1);text-align:center;}
.lbo-result-val{font-family:var(--serif);font-size:18px;font-weight:600;display:block;}
.lbo-result-lbl{font-family:var(--mono);font-size:7px;letter-spacing:1.5px;color:var(--text2);text-transform:uppercase;margin-top:3px;display:block;}
.ptools{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px;}
.pcard-screenshot{margin:12px 0;border-radius:6px;overflow:hidden;border:1px solid rgba(184,151,58,0.15);}
.pcard-img{width:100%;display:block;object-fit:cover;max-height:220px;}
.pcard-links{margin-top:10px;}
.pcard-relevant{display:flex;align-items:center;flex-wrap:wrap;gap:6px;margin-top:14px;padding-top:12px;border-top:1px solid rgba(184,151,58,0.1);}
.pcard-relevant-label{font-family:var(--mono);font-size:7px;letter-spacing:2px;color:var(--text2);text-transform:uppercase;margin-right:3px;white-space:nowrap;}
.pcard-relevant-chip{font-family:var(--mono);font-size:8px;letter-spacing:0.8px;color:var(--gold);padding:3px 9px;border:1px solid rgba(184,151,58,0.2);background:rgba(184,151,58,0.05);text-transform:uppercase;transition:all 0.2s;}
.pcard-relevant-chip:hover{background:rgba(184,151,58,0.12);border-color:rgba(184,151,58,0.38);}
.pcard-published-chip{display:inline-flex;align-items:center;gap:5px;font-family:var(--mono);font-size:8px;letter-spacing:1.5px;color:#5ECFA0;padding:4px 12px;border:1px solid rgba(94,207,160,0.28);background:rgba(94,207,160,0.06);text-transform:uppercase;}
.pcard-live-chip{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;background:rgba(184,151,58,0.1);border:1px solid rgba(184,151,58,0.3);border-radius:20px;color:var(--gold);font-size:11px;font-family:var(--mono);text-decoration:none;transition:background 0.2s;}
.pcard-live-chip:hover{background:rgba(184,151,58,0.2);}
.live-dot{width:6px;height:6px;border-radius:50%;background:#4caf50;display:inline-block;animation:blink 1.4s infinite;}
.ptool{font-family:var(--mono);font-size:9px;color:var(--text2);display:flex;align-items:center;gap:4px;}
.ptool::after{content:' /';margin-right:2px;opacity:0.3;}
.ptool:last-child::after{display:none;}
.ptool-logo{display:flex;align-items:center;line-height:0;}
.flow-live-dot{display:inline-block;width:6px;height:6px;background:var(--green2);border-radius:50%;margin-right:6px;animation:otw-pulse 1.8s ease-in-out infinite;vertical-align:middle;}
.fnode-live{animation:fnode-pulse 2.4s ease-in-out infinite;border-color:rgba(61,168,122,0.25) !important;color:var(--green2) !important;}
@keyframes fnode-pulse{0%,100%{background:rgba(61,168,122,0.04);}50%{background:rgba(61,168,122,0.12);}}
.cap-box{background:var(--ink);border:1px solid rgba(184,151,58,0.09);padding:12px 14px;margin:12px 0;}
.cap-title{font-family:var(--mono);font-size:8px;letter-spacing:2.5px;color:var(--gold);text-transform:uppercase;margin-bottom:9px;}
.cap-bar{display:flex;height:6px;width:100%;}
.cap-seg{height:100%;}
.cap-legend{display:flex;gap:10px;flex-wrap:wrap;margin-top:8px;}
.cap-leg{display:flex;align-items:center;gap:4px;font-family:var(--mono);font-size:8px;color:var(--text2);}
.cap-dot{width:6px;height:6px;flex-shrink:0;}
.flow-box{background:var(--ink);border:1px solid rgba(184,151,58,0.09);padding:12px 14px;margin:12px 0;}
.flow-title{font-family:var(--mono);font-size:8px;letter-spacing:2.5px;color:var(--gold);text-transform:uppercase;margin-bottom:8px;}
.flow-nodes{display:flex;flex-wrap:wrap;gap:5px;align-items:center;}
.fnode{padding:4px 9px;border:1px solid rgba(184,151,58,0.14);background:rgba(184,151,58,0.04);font-family:var(--mono);font-size:9px;color:var(--silver);white-space:nowrap;}
.farrow{color:var(--gold);font-size:9px;opacity:0.45;}
.tl-bg{background:var(--ink2);padding:96px 0;}
.tl-inner{max-width:1280px;margin:0 auto;padding:0 60px;}

/* SERVICES */
.svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;}
.scard{padding:34px 26px;background:var(--ink2);border:1px solid rgba(184,151,58,0.07);position:relative;overflow:hidden;transition:all 0.4s cubic-bezier(.22,1,.36,1);}
.scard:hover{background:rgba(184,151,58,0.02);border-color:rgba(184,151,58,0.18);transform:translateY(-3px);}
.scard-bg-num{position:absolute;top:10px;right:14px;font-family:var(--serif);font-size:60px;font-weight:700;color:rgba(184,151,58,0.04);line-height:1;user-select:none;}
.scard-icon{margin-bottom:16px;}
.scard-title{font-family:var(--serif);font-size:18px;font-weight:500;color:var(--text);margin-bottom:4px;}
.scard-note{font-family:var(--mono);font-size:9px;letter-spacing:1.5px;color:var(--green2);text-transform:uppercase;margin-bottom:12px;opacity:0.8;}
.scard-desc{font-size:13px;color:var(--text2);line-height:1.8;margin-bottom:14px;}
.scard-tools{display:flex;flex-wrap:wrap;gap:4px;}
.stool{font-family:var(--mono);font-size:9px;letter-spacing:1px;color:var(--gold);opacity:0.65;text-transform:uppercase;}
.stool::after{content:' ·';margin-right:2px;}
.stool:last-child::after{display:none;}

/* CONTACT */
.contact-bg{background:var(--ink2);}
.contact-inner{max-width:860px;margin:0 auto;padding:110px 60px;text-align:center;}
.contact-crest-wrap{display:flex;justify-content:center;margin-bottom:28px;}
.contact-big{font-family:var(--serif);font-size:clamp(36px,4.8vw,62px);font-weight:400;line-height:1.13;color:var(--text);margin-bottom:16px;}
.contact-big em{font-style:italic;color:var(--gold2);}
.contact-sub{font-size:14px;color:var(--text2);line-height:1.85;margin-bottom:40px;max-width:540px;margin-left:auto;margin-right:auto;}
.cot-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-bottom:44px;text-align:left;}
.cot-card{padding:22px 20px;background:var(--ink3);border:1px solid rgba(184,151,58,0.08);transition:all 0.3s;}
.cot-card:hover{border-color:rgba(184,151,58,0.22);background:rgba(184,151,58,0.03);}
.cot-card-label{font-family:var(--mono);font-size:8px;letter-spacing:2.5px;color:var(--gold);text-transform:uppercase;margin-bottom:12px;display:flex;align-items:center;gap:6px;}
.cot-dot{width:5px;height:5px;background:var(--green2);border-radius:50%;animation:otw-pulse 2.4s ease-in-out infinite;}
.cot-items{display:flex;flex-direction:column;gap:5px;}
.cot-item{font-size:13px;color:var(--silver);display:flex;align-items:center;gap:8px;}
.cot-item::before{content:'';width:3px;height:3px;background:var(--gold);border-radius:50%;flex-shrink:0;}
.contact-email-wrap{margin-bottom:32px;}
.contact-email{font-family:var(--serif);font-size:20px;font-style:italic;color:var(--gold2);text-decoration:none;border-bottom:1px solid rgba(184,151,58,0.28);padding-bottom:4px;transition:all 0.3s;}
.contact-email:hover{color:var(--gold3);border-color:var(--gold3);}
.contact-btns{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;}

/* INTRO SPLASH */
.intro-splash{position:fixed;inset:0;z-index:1000;background:var(--ink);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:18px;pointer-events:none;}
.intro-splash.fade-out{animation:splashFade 0.8s cubic-bezier(.22,1,.36,1) forwards;}
@keyframes splashFade{0%{opacity:1;}100%{opacity:0;pointer-events:none;}}
.intro-greeting{font-family:var(--mono);font-size:clamp(11px,1.2vw,14px);letter-spacing:4px;color:var(--gold);text-transform:uppercase;opacity:0;animation:riseIn 0.7s cubic-bezier(.22,1,.36,1) 0.2s forwards;}
.intro-name{font-family:var(--serif);font-size:clamp(42px,6vw,90px);font-weight:400;color:var(--text);line-height:1;overflow:hidden;}
.intro-name-inner{display:block;transform:translateY(100%);animation:slideUp 0.9s cubic-bezier(.22,1,.36,1) 0.55s forwards;}
.intro-name em{font-style:italic;color:var(--gold2);}
.intro-tagline{font-family:var(--mono);font-size:clamp(9px,0.9vw,11px);letter-spacing:3px;color:var(--text2);text-transform:uppercase;opacity:0;animation:riseIn 0.7s cubic-bezier(.22,1,.36,1) 1.0s forwards;}
.intro-line{width:0;height:1px;background:linear-gradient(90deg,var(--gold),var(--gold2));animation:lineExpand 0.9s cubic-bezier(.22,1,.36,1) 0.8s forwards;}
@keyframes slideUp{from{transform:translateY(100%);}to{transform:translateY(0);}}
@keyframes lineExpand{from{width:0;}to{width:160px;}}


footer{border-top:1px solid rgba(184,151,58,0.09);padding:20px 60px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;}
.foot-l{font-family:var(--mono);font-size:10px;color:var(--text2);letter-spacing:0.8px;}
.foot-r{font-size:11px;color:var(--text2);}
.foot-r a{color:var(--gold);text-decoration:none;}

/* TIMELINE */
.timeline-wrap{position:relative;max-width:860px;margin:0 auto;padding:20px 0 40px;}
.timeline-line{position:absolute;left:50%;top:0;bottom:0;width:1px;background:linear-gradient(to bottom,transparent,rgba(184,151,58,0.25) 10%,rgba(184,151,58,0.25) 90%,transparent);transform:translateX(-50%);}
.tl-item{position:relative;width:calc(50% - 36px);opacity:0;transform:translateY(16px);transition:opacity 0.6s cubic-bezier(.22,1,.36,1),transform 0.6s cubic-bezier(.22,1,.36,1);margin-bottom:28px;}
.tl-item.tl-left{margin-left:0;text-align:right;}
.tl-item.tl-right{margin-left:calc(50% + 36px);text-align:left;}
.tl-item.tl-vis{opacity:1;transform:translateY(0);}
.tl-dot{position:absolute;top:14px;width:10px;height:10px;border-radius:50%;z-index:2;}
.tl-left .tl-dot{right:-41px;}
.tl-right .tl-dot{left:-41px;}
.tl-card{padding:14px 16px;background:var(--ink3);border:1px solid rgba(184,151,58,0.1);transition:border-color 0.3s,background 0.3s;position:relative;}
.tl-card:hover{border-color:rgba(184,151,58,0.25);background:rgba(184,151,58,0.03);}
.tl-active{border-color:rgba(184,151,58,0.3) !important;background:rgba(184,151,58,0.05) !important;}
.tl-meta{display:flex;align-items:center;gap:8px;margin-bottom:5px;flex-wrap:wrap;}
.tl-left .tl-meta{justify-content:flex-end;}
.tl-date{font-family:var(--mono);font-size:8px;letter-spacing:2px;color:var(--text2);text-transform:uppercase;}
.tl-type{font-family:var(--mono);font-size:8px;letter-spacing:1.5px;text-transform:uppercase;}
.tl-label{font-family:var(--serif);font-size:14px;font-weight:500;color:var(--text);margin-bottom:4px;line-height:1.3;}
.tl-detail{font-size:11px;color:var(--text2);line-height:1.65;}
.tl-now{display:inline-block;margin-top:8px;font-family:var(--mono);font-size:8px;letter-spacing:2px;color:var(--green2);padding:2px 8px;border:1px solid rgba(61,168,122,0.3);background:rgba(61,168,122,0.07);text-transform:uppercase;}
@media(max-width:900px){
  .timeline-line{left:16px;}
  .tl-item,.tl-item.tl-left,.tl-item.tl-right{width:calc(100% - 44px);margin-left:44px;text-align:left;}
  .tl-left .tl-dot,.tl-right .tl-dot{left:-31px;right:auto;}
  .tl-left .tl-meta{justify-content:flex-start;}
}

/* ANIMATIONS */
@keyframes riseIn{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
@keyframes fadeLeft{from{opacity:0;transform:translateX(26px);}to{opacity:1;transform:translateX(0);}}
@keyframes blink{50%{opacity:0;}}
.reveal{opacity:0;transform:translateY(16px);transition:opacity 0.7s cubic-bezier(.22,1,.36,1),transform 0.7s cubic-bezier(.22,1,.36,1);}
.reveal.vis{opacity:1;transform:translateY(0);}
.d1{transition-delay:0.08s;}.d2{transition-delay:0.18s;}.d3{transition-delay:0.28s;}.d4{transition-delay:0.38s;}

@media(max-width:1024px){
  .comp-grid{grid-template-columns:repeat(2,1fr);}
  .exec-grid{grid-template-columns:1fr;gap:40px;}
  .exec-value-row{grid-template-columns:1fr 1fr;}
}
@media(max-width:900px){
  .otw-banner{padding:7px 20px;}.otw-div,.otw-chip{display:none;}
  #nav{padding:14px 22px;top:30px;}#nav.stuck{padding:12px 22px;top:0;}.nav-links{display:none;}
  #hero{grid-template-columns:1fr;padding:130px 22px 60px;gap:40px;}
  .hero-right{align-items:flex-start;}.hero-panel{width:100%;}
  .about-grid{grid-template-columns:1fr;gap:44px;}
  .comp-grid{grid-template-columns:1fr 1fr;}
  .edge-grid{grid-template-columns:1fr;}
  .proj-grid{grid-template-columns:1fr;}
  .svc-grid{grid-template-columns:1fr;}
  .cot-grid{grid-template-columns:1fr;}
  .section,.proj-inner,.edge-inner,.comp-inner,.exec-inner,.tl-inner{padding:68px 22px;}
  .rule{padding:0 22px;}.contact-inner{padding:68px 22px;}
  footer{padding:20px 22px;}
  .lbo-inputs{grid-template-columns:1fr !important;}
  .exec-value-row{grid-template-columns:1fr;}
}
`;

function CrestLogo({ size = 40 }) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      {/* Gold square border */}
      <rect x="1" y="1" width="38" height="38" stroke="#B8973A" strokeWidth="1.2" fill="rgba(184,151,58,0.06)"/>
      {/* K letter */}
      <rect x="11" y="10" width="3.5" height="20" fill="#D4AF55"/>
      <path d="M14.5 20L24 10L28.5 10L18 20.5Z" fill="#D4AF55"/>
      <path d="M14.5 20L28.5 30L24 30L14.5 21.5Z" fill="#D4AF55"/>
      {/* corner accents */}
      <rect x="1" y="1" width="5" height="1.5" fill="#B8973A"/>
      <rect x="1" y="1" width="1.5" height="5" fill="#B8973A"/>
      <rect x="34" y="1" width="5" height="1.5" fill="#B8973A"/>
      <rect x="38.5" y="1" width="1.5" height="5" fill="#B8973A"/>
      <rect x="1" y="37.5" width="5" height="1.5" fill="#B8973A"/>
      <rect x="1" y="34" width="1.5" height="5" fill="#B8973A"/>
      <rect x="34" y="37.5" width="5" height="1.5" fill="#B8973A"/>
      <rect x="38.5" y="34" width="1.5" height="5" fill="#B8973A"/>
    </svg>
  );
}

function GeoBg() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); let raf, t = 0;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize(); window.addEventListener("resize", resize);
    const shapes = Array.from({ length: 12 }, (_, i) => ({
      x: Math.random(), y: Math.random(), size: 28 + Math.random() * 80,
      spd: 0.00012 + Math.random() * 0.00025, phase: Math.random() * Math.PI * 2,
      type: i % 3, alpha: 0.01 + Math.random() * 0.016,
    }));
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); t++;
      shapes.forEach(s => {
        const x = s.x * canvas.width, y = s.y * canvas.height + Math.sin(t * s.spd + s.phase) * 14;
        ctx.save(); ctx.translate(x, y); ctx.rotate(t * s.spd * 0.35);
        ctx.strokeStyle = `rgba(184,151,58,${s.alpha})`; ctx.lineWidth = 1; ctx.beginPath();
        if (s.type === 0) { ctx.moveTo(0,-s.size/2); ctx.lineTo(s.size/2,0); ctx.lineTo(0,s.size/2); ctx.lineTo(-s.size/2,0); ctx.closePath(); }
        else if (s.type === 1) { ctx.rect(-s.size/2,-s.size/2,s.size,s.size); }
        else { ctx.moveTo(0,-s.size/2); ctx.lineTo(0,s.size/2); ctx.moveTo(-s.size/2,0); ctx.lineTo(s.size/2,0); }
        ctx.stroke(); ctx.restore();
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="hero-canvas"/>;
}

function useCountUp(target, duration = 1600) {
  const [val, setVal] = useState(target);
  const ref = useRef(null);
  const ran = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !ran.current) {
        ran.current = true;
        const num = parseFloat(String(target).replace(/[^0-9.]/g,""));
        let start = null;
        const step = ts => {
          if (!start) start = ts;
          const pct = Math.min((ts - start) / duration, 1);
          const ease = 1 - Math.pow(1 - pct, 3);
          setVal(+(num * ease).toFixed(num < 10 ? 1 : 0));
          if (pct < 1) requestAnimationFrame(step);
          else setVal(num);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return { val, ref };
}

const PANEL_SECTIONS = [
  {
    id:"fin",
    label:"Financial Models",
    count:"5 models",
    color:"#D4AF55",
    items:[
      {title:"PVR INOX — LBO",         tag:"Leveraged Buyout"},
      {title:"HDFC Bank — P/B",         tag:"Banking Valuation"},
      {title:"Hero MotoCorp — DCF",     tag:"Equity Research"},
      {title:"Mizuho × Avendus — SOTP", tag:"Buy-Side M&A"},
      {title:"Nestlé India — FP&A",     tag:"Budget · Forecast"},
    ],
  },
  {
    id:"auto",
    label:"Automation",
    count:"2 deployments",
    color:"#5ECFA0",
    items:[
      {title:"Robo Advisory Pipeline", tag:"n8n · Live on Vercel"},
      {title:"AHAM Framework",         tag:"Dash · ITI Securities"},
    ],
  },
  {
    id:"ml",
    label:"ML & Analytics",
    count:"4 algorithms",
    color:"#6EB5FF",
    items:[
      {title:"ARIMA · SARIMA",   tag:"Time Series"},
      {title:"XGBoost",          tag:"Gradient Boosting"},
      {title:"LSTM",             tag:"Deep Learning"},
    ],
  },
  {
    id:"pub",
    label:"Published Research",
    count:"1 paper",
    color:"#B07AFF",
    items:[
      {title:"AHAM — Investor Risk Profiling",  tag:"Co-authored · Sri Ramakrishna College"},
      {title:"MPT · SAA · Monte Carlo",         tag:"SEBI Compliant Framework"},
    ],
  },
];

function AnalystPanel() {
  const [active, setActive] = useState(0);
  const s = PANEL_SECTIONS[active];

  return (
    <div className="hero-panel">
      <div className="hp-header">
        <div className="hp-header-left">
          <CrestLogo size={26}/>
          <span className="hp-header-title">Student Profile</span>
        </div>
        <div className="hp-otw"><div className="hp-otw-dot"/>Apr 2026</div>
      </div>

      <div className="hp-tiles">
        {PANEL_SECTIONS.map((sec,i) => (
          <button
            key={sec.id}
            className={`hp-tile${active===i?" hp-tile-active":""}`}
            style={active===i?{borderColor:`${sec.color}44`,background:`${sec.color}0C`}:{}}
            onClick={()=>setActive(i)}
          >
            <span className="hp-tile-lbl" style={active===i?{color:sec.color}:{}}>{sec.label}</span>
            <span className="hp-tile-count" style={active===i?{color:sec.color,opacity:0.7}:{}}>{sec.count}</span>
          </button>
        ))}
      </div>

      <div className="hp-detail" key={active}>
        {s.items.map((item,i) => (
          <div className="hp-detail-item" key={item.title} style={{animationDelay:`${i*0.08}s`}}>
            <span className="hp-detail-accent" style={{background:s.color}}/>
            <div className="hp-detail-content">
              <span className="hp-detail-title">{item.title}</span>
              <span className="hp-detail-tag">{item.tag}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="hp-footer">
        <span className="hp-footer-tag">MBA Finance · 2026</span>
        <div className="hp-footer-dot"/>
        <span className="hp-footer-tag">Coimbatore</span>
      </div>
    </div>
  );
}

function CountStat({ val, lbl }) {
  const suffix = String(val).replace(/[0-9.]/g,"");
  const num = parseFloat(String(val).replace(/[^0-9.]/g,""));
  const { val: animated, ref } = useCountUp(num);
  return (
    <div className="hp-stat" ref={ref}>
      <div className="hp-stat-val">{animated}{suffix}</div>
      <div className="hp-stat-lbl">{lbl}</div>
    </div>
  );
}

function MetBox({ val, lbl, tip, rating }) {
  const suffix = String(val).replace(/[0-9.,]/g,"");
  const num = parseFloat(String(val).replace(/[^0-9.]/g,""));
  const { val: animated, ref } = useCountUp(isNaN(num) ? 0 : num);
  const display = isNaN(num) ? val : `${animated}${suffix}`;
  const isBuy = rating && val === "BUY";
  return (
    <div className="pmet" ref={ref}>
      <span className="pmet-val" style={isBuy?{color:"#5ECFA0",fontWeight:700}:{}}>{display}</span>
      <span className="pmet-lbl">{lbl}</span>
      {tip && (
        <div className="pmet-tooltip">
          <div className="pmet-tooltip-title">{lbl}</div>
          <div className="pmet-tooltip-body">{tip}</div>
        </div>
      )}
    </div>
  );
}

function LBOCalc() {
  const [exitMult, setExitMult] = useState(9);
  const [holdYears, setHoldYears] = useState(5);
  const entryEV = 12254, entryEBITDA = 1400, debt = 3388;
  const equity = entryEV - debt;
  const exitEV = exitMult * entryEBITDA;
  const exitEquity = Math.max(exitEV - debt * 0.7, 0);
  const moic = +(exitEquity / equity).toFixed(2);
  const irr = +(((Math.pow(moic, 1/holdYears) - 1) * 100)).toFixed(1);
  const col = moic >= 2 ? "#5ECFA0" : moic >= 1.5 ? "#D4AF55" : "#FF9F6B";
  return (
    <div className="lbo-calc">
      <div className="lbo-calc-title">Live IRR / MOIC Calculator <span className="lbo-calc-badge">Interactive · Adjust Assumptions</span></div>
      <div className="lbo-inputs">
        <div className="lbo-input-group">
          <span className="lbo-input-label">Exit EV / EBITDA Multiple</span>
          <span className="lbo-slider-val">{exitMult}x</span>
          <input type="range" className="lbo-slider" min="6" max="14" step="0.5" value={exitMult} onChange={e=>setExitMult(+e.target.value)}/>
        </div>
        <div className="lbo-input-group">
          <span className="lbo-input-label">Hold Period (Years)</span>
          <span className="lbo-slider-val">{holdYears}y</span>
          <input type="range" className="lbo-slider" min="3" max="8" step="1" value={holdYears} onChange={e=>setHoldYears(+e.target.value)}/>
        </div>
      </div>
      <div className="lbo-results">
        <div className="lbo-result"><span className="lbo-result-val" style={{color:col}}>{moic}x</span><span className="lbo-result-lbl">Gross MOIC</span></div>
        <div className="lbo-result"><span className="lbo-result-val" style={{color:col}}>{irr}%</span><span className="lbo-result-lbl">Gross IRR</span></div>
        <div className="lbo-result"><span className="lbo-result-val">₹{(exitEV/100).toFixed(0)}Cr</span><span className="lbo-result-lbl">Exit EV</span></div>
      </div>
    </div>
  );
}

function DCFCalc() {
  const [tgr, setTgr] = useState(5.0);
  const [waccVal, setWaccVal] = useState(11.3);
  // From report: PV of FCFFs = 26,539, TV formula = FCFF30E*(1+g)/(WACC-g) discounted
  // Conservative target at base: 6,150. We'll recalculate relative to base
  const baseCMP = 5573;
  // Sensitivity table from report (WACC vs TGR)
  const sens = {
    9.5:  {3.5:6648,4.0:6938,4.5:7228,5.0:7518,5.5:7808,6.0:8098},
    10.0: {3.5:6268,4.0:6558,4.5:6848,5.0:7138,5.5:7428,6.0:7718},
    10.5: {3.5:5888,4.0:6178,4.5:6468,5.0:6758,5.5:7048,6.0:7338},
    11.0: {3.5:5508,4.0:5798,4.5:6088,5.0:6378,5.5:6668,6.0:6958},
    11.3: {3.5:5280,4.0:5570,4.5:5860,5.0:6150,5.5:6440,6.0:6730},
    11.5: {3.5:5128,4.0:5418,4.5:5708,5.0:5998,5.5:6288,6.0:6578},
    12.0: {3.5:4748,4.0:5038,4.5:5328,5.0:5618,5.5:5908,6.0:6198},
    12.5: {3.5:4368,4.0:4658,4.5:4948,5.0:5238,5.5:5528,6.0:5810},
  };
  // Find nearest WACC row
  const waccKeys = [9.5,10.0,10.5,11.0,11.3,11.5,12.0,12.5];
  const tgrKeys  = [3.5,4.0,4.5,5.0,5.5,6.0];
  const nearestW = waccKeys.reduce((a,b)=>Math.abs(b-waccVal)<Math.abs(a-waccVal)?b:a);
  const nearestT = tgrKeys.reduce((a,b)=>Math.abs(b-tgr)<Math.abs(a-tgr)?b:a);
  const targetPrice = sens[nearestW]?.[nearestT] ?? 6150;
  const upside = +(((targetPrice - baseCMP)/baseCMP)*100).toFixed(1);
  const col = upside > 10 ? "#5ECFA0" : upside > 0 ? "#D4AF55" : "#FF9F6B";
  const rating = upside > 0 ? "BUY" : "HOLD";
  const ratingCol = upside > 0 ? "#5ECFA0" : "#D4AF55";
  return (
    <div className="lbo-calc">
      <div className="lbo-calc-title">Live DCF Sensitivity <span className="lbo-calc-badge">Real Model Data · Adjust WACC &amp; TGR</span></div>
      <div className="lbo-inputs" style={{gridTemplateColumns:"1fr 1fr"}}>
        <div className="lbo-input-group">
          <span className="lbo-input-label">WACC: {waccVal}%</span>
          <input type="range" className="lbo-slider" min="9.5" max="12.5" step="0.5" value={waccVal} onChange={e=>setWaccVal(+e.target.value)}/>
          <span className="lbo-slider-val" style={{fontSize:"11px",color:"var(--text2)"}}>Base: 11.3%</span>
        </div>
        <div className="lbo-input-group">
          <span className="lbo-input-label">Terminal Growth: {tgr}%</span>
          <input type="range" className="lbo-slider" min="3.5" max="6.0" step="0.5" value={tgr} onChange={e=>setTgr(+e.target.value)}/>
          <span className="lbo-slider-val" style={{fontSize:"11px",color:"var(--text2)"}}>Base: 5.0% (India GDP)</span>
        </div>
      </div>
      <div className="lbo-results" style={{gridTemplateColumns:"repeat(4,1fr)"}}>
        <div className="lbo-result"><span className="lbo-result-val" style={{color:col}}>₹{targetPrice.toLocaleString("en-IN")}</span><span className="lbo-result-lbl">Target Price</span></div>
        <div className="lbo-result"><span className="lbo-result-val" style={{color:col}}>{upside}%</span><span className="lbo-result-lbl">vs CMP ₹5,573</span></div>
        <div className="lbo-result"><span className="lbo-result-val" style={{color:ratingCol,fontWeight:700}}>{rating}</span><span className="lbo-result-lbl">Rating</span></div>
        <div className="lbo-result"><span className="lbo-result-val">11.3%</span><span className="lbo-result-lbl">Base WACC</span></div>
      </div>
    </div>
  );
}

function NiftyChart() {
  const canvasRef = useRef(null);
  const [activeModel, setActiveModel] = useState("LSTM");
  const [hoveredPt, setHoveredPt] = useState(null);
  const [animated, setAnimated] = useState(false);
  const animRef = useRef(null);
  const progressRef = useRef(0);

  // Historical NIFTY data (approximate weekly, last 60 weeks) + 12-week forecasts per model
  const historical = [17200,17450,17800,17600,17900,18200,18100,18400,18700,18500,19000,19300,19100,19600,19800,19500,20100,20400,20200,20600,20900,21200,21000,21500,21300,21700,22100,21900,22400,22700,22500,23000,23200,23000,23500,23700,23400,24000,24300,24100,24500,24200,24700,24900,24600,25100,24800,25400,25200,25600,25900,25700,26000,25800,26300,26100,25700,25400,25100,24800];
  const forecasts = {
    ARIMA:  [24600,24400,24200,24000,23800,23600,23400,23200,23000,22800,22600,22400],
    SARIMA: [24900,24700,25000,24800,25200,25000,25400,25200,25600,25400,25800,25600],
    XGBoost:[25000,25300,25600,25200,25500,25800,26100,25900,26200,26500,26800,27100],
    LSTM:   [25100,25500,25900,26300,26700,27100,27500,27900,28300,28700,29100,29500],
  };
  const modelColors = { ARIMA:"#FF9F6B", SARIMA:"#6EB5FF", XGBoost:"#D4AF55", LSTM:"#5ECFA0" };

  const startAnimation = () => {
    setAnimated(false);
    progressRef.current = 0;
    if (animRef.current) cancelAnimationFrame(animRef.current);
    const duration = 1800;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      progressRef.current = t;
      draw(t);
      if (t < 1) animRef.current = requestAnimationFrame(step);
      else setAnimated(true);
    };
    animRef.current = requestAnimationFrame(step);
  };

  const draw = (progress = 1) => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    const pad = {l:52,r:20,t:20,b:36};
    const allVals = [...historical, ...forecasts[activeModel]];
    const minV = Math.min(...allVals)*0.985, maxV = Math.max(...allVals)*1.015;
    const toX = (i, total) => pad.l + (i/(total-1))*(W-pad.l-pad.r);
    const toY = (v) => pad.t + (1-(v-minV)/(maxV-minV))*(H-pad.t-pad.b);

    ctx.clearRect(0,0,W,H);

    // Grid
    ctx.strokeStyle = "rgba(184,151,58,0.06)"; ctx.lineWidth = 1;
    for (let i=0;i<=5;i++) {
      const y = pad.t + i*(H-pad.t-pad.b)/5;
      ctx.beginPath(); ctx.moveTo(pad.l,y); ctx.lineTo(W-pad.r,y); ctx.stroke();
      const val = Math.round(maxV - i*(maxV-minV)/5);
      ctx.fillStyle="rgba(154,163,178,0.5)"; ctx.font="9px IBM Plex Mono,monospace"; ctx.textAlign="right";
      ctx.fillText(val.toLocaleString("en-IN"),pad.l-4,y+3);
    }

    // Divider line
    const splitX = toX(historical.length-1, historical.length+forecasts[activeModel].length);
    ctx.strokeStyle="rgba(184,151,58,0.25)"; ctx.lineWidth=1; ctx.setLineDash([3,4]);
    ctx.beginPath(); ctx.moveTo(splitX,pad.t); ctx.lineTo(splitX,H-pad.b); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle="rgba(184,151,58,0.55)"; ctx.font="8px IBM Plex Mono,monospace"; ctx.textAlign="center";
    ctx.fillText("NOW",splitX,pad.t-4);

    const totalPts = historical.length + forecasts[activeModel].length;

    // Historical gradient fill
    ctx.beginPath();
    ctx.moveTo(toX(0,totalPts), H-pad.b);
    historical.forEach((v,i)=>{ const x=toX(i,totalPts),y=toY(v); i===0?ctx.lineTo(x,y):ctx.lineTo(x,y); });
    ctx.lineTo(toX(historical.length-1,totalPts),H-pad.b);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0,pad.t,0,H-pad.b);
    grad.addColorStop(0,"rgba(184,151,58,0.12)"); grad.addColorStop(1,"rgba(184,151,58,0)");
    ctx.fillStyle=grad; ctx.fill();

    // Historical line
    ctx.beginPath();
    historical.forEach((v,i)=>{ const x=toX(i,totalPts),y=toY(v); i===0?ctx.moveTo(x,y):ctx.lineTo(x,y); });
    ctx.strokeStyle="#B8973A"; ctx.lineWidth=1.8; ctx.stroke();

    // Forecast animated line
    const fc = forecasts[activeModel];
    const fcPts = Math.floor(fc.length * progress);
    if (fcPts > 0) {
      // Forecast fill
      ctx.beginPath();
      ctx.moveTo(toX(historical.length-1,totalPts),H-pad.b);
      ctx.lineTo(toX(historical.length-1,totalPts),toY(historical[historical.length-1]));
      for (let i=0;i<fcPts;i++) {
        const idx = historical.length+i;
        ctx.lineTo(toX(idx,totalPts), toY(fc[i]));
      }
      ctx.lineTo(toX(historical.length+fcPts-1,totalPts),H-pad.b);
      ctx.closePath();
      const fcGrad = ctx.createLinearGradient(0,pad.t,0,H-pad.b);
      const col = modelColors[activeModel];
      fcGrad.addColorStop(0,col+"33"); fcGrad.addColorStop(1,col+"00");
      ctx.fillStyle=fcGrad; ctx.fill();

      ctx.beginPath();
      ctx.moveTo(toX(historical.length-1,totalPts),toY(historical[historical.length-1]));
      for (let i=0;i<fcPts;i++) {
        const idx = historical.length+i;
        ctx.lineTo(toX(idx,totalPts), toY(fc[i]));
      }
      ctx.strokeStyle=modelColors[activeModel]; ctx.lineWidth=2; ctx.stroke();

      // Animated dot at tip
      if (progress < 1) {
        const tipX = toX(historical.length+fcPts-1,totalPts);
        const tipY = toY(fc[fcPts-1]);
        ctx.beginPath(); ctx.arc(tipX,tipY,4,0,Math.PI*2);
        ctx.fillStyle=modelColors[activeModel]; ctx.fill();
        ctx.beginPath(); ctx.arc(tipX,tipY,8,0,Math.PI*2);
        ctx.strokeStyle=modelColors[activeModel]+"66"; ctx.lineWidth=1.5; ctx.stroke();
      }
    }

    // Final target dot
    if (progress >= 1) {
      const lastFc = fc[fc.length-1];
      const tx = toX(totalPts-1,totalPts), ty = toY(lastFc);
      ctx.beginPath(); ctx.arc(tx,ty,5,0,Math.PI*2);
      ctx.fillStyle=modelColors[activeModel]; ctx.fill();
      ctx.fillStyle=modelColors[activeModel]; ctx.font="bold 10px IBM Plex Mono,monospace"; ctx.textAlign="left";
      ctx.fillText("₹"+lastFc.toLocaleString("en-IN"), tx+8, ty+3);
    }

    // X axis labels
    const xLabels = ["Jan'24","Apr'24","Jul'24","Oct'24","Jan'25","Apr'25","Jul'25","Oct'25","Jan'26","Forecast"];
    ctx.fillStyle="rgba(154,163,178,0.5)"; ctx.font="8px IBM Plex Mono,monospace"; ctx.textAlign="center";
    xLabels.forEach((l,i)=>{
      const x = pad.l + (i/(xLabels.length-1))*(W-pad.l-pad.r);
      ctx.fillText(l,x,H-pad.b+14);
    });
  };

  useEffect(() => { startAnimation(); return ()=>{if(animRef.current)cancelAnimationFrame(animRef.current)}; }, [activeModel]);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    canvas.width = canvas.offsetWidth * window.devicePixelRatio || 560;
    canvas.height = 180;
    canvas.style.width = "100%"; canvas.style.height = "180px";
    draw(progressRef.current);
  }, []);

  return (
    <div style={{background:"var(--ink)",border:"1px solid rgba(184,151,58,0.12)",padding:"14px",marginTop:"12px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"10px",flexWrap:"wrap",gap:"6px"}}>
        <span style={{fontFamily:"var(--mono)",fontSize:"8px",letterSpacing:"2.5px",color:"var(--gold)",textTransform:"uppercase"}}>NIFTY 50 Forecast Comparison</span>
        <div style={{display:"flex",gap:"4px",flexWrap:"wrap"}}>
          {Object.keys(modelColors).map(m=>(
            <button key={m} onClick={()=>setActiveModel(m)} style={{fontFamily:"var(--mono)",fontSize:"8px",letterSpacing:"1px",padding:"3px 9px",border:`1px solid ${activeModel===m?modelColors[m]:"rgba(184,151,58,0.18)"}`,background:activeModel===m?modelColors[m]+"18":"transparent",color:activeModel===m?modelColors[m]:"var(--text2)",cursor:"pointer",textTransform:"uppercase",transition:"all 0.2s"}}>
              {m}
            </button>
          ))}
        </div>
      </div>
      <canvas ref={canvasRef} style={{width:"100%",height:"180px",display:"block"}}/>
      <div style={{display:"flex",justifyContent:"space-between",marginTop:"8px",flexWrap:"wrap",gap:"6px"}}>
        {Object.entries(modelColors).map(([m,c])=>(
          <div key={m} style={{display:"flex",alignItems:"center",gap:"5px",cursor:"pointer",opacity:activeModel===m?1:0.4,transition:"opacity 0.2s"}} onClick={()=>setActiveModel(m)}>
            <div style={{width:"16px",height:"2px",background:c}}/>
            <span style={{fontFamily:"var(--mono)",fontSize:"8px",color:c,letterSpacing:"1px"}}>{m}</span>
          </div>
        ))}
        <button onClick={startAnimation} style={{fontFamily:"var(--mono)",fontSize:"7px",letterSpacing:"1px",padding:"2px 8px",border:"1px solid rgba(184,151,58,0.22)",background:"transparent",color:"var(--text2)",cursor:"pointer",textTransform:"uppercase"}}>↺ Replay</button>
      </div>
    </div>
  );
}



function AHAMChart() {
  const [activeTab, setActiveTab] = useState("allocation");
  const [activeProfile, setActiveProfile] = useState("Moderate");
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const progressRef = useRef(0);

  // AHAM Portfolio Allocations from research paper
  const profiles = {
    Conservative: {
      color:"#6EB5FF",
      alloc:{ "NIFTY 50":30, "Corporate Bonds":50, "Gold BEES":15, "Small Cap":0, "NASDAQ 100":5 },
      metrics:{ cagr:"9.8%", vol:"7.2%", sharpe:"0.52", maxDD:"-12.1%" }
    },
    Moderate: {
      color:"#D4AF55",
      alloc:{ "NIFTY 50":50, "Corporate Bonds":25, "Gold BEES":15, "Small Cap":5, "NASDAQ 100":5 },
      metrics:{ cagr:"12.4%", vol:"12.8%", sharpe:"0.57", maxDD:"-22.3%" }
    },
    Aggressive: {
      color:"#5ECFA0",
      alloc:{ "NIFTY 50":60, "Corporate Bonds":10, "Gold BEES":10, "Small Cap":15, "NASDAQ 100":5 },
      metrics:{ cagr:"15.1%", vol:"19.4%", sharpe:"0.55", maxDD:"-35.8%" }
    },
  };

  // Monte Carlo paths (simplified 12-month simulation, 3 percentile bands per profile)
  const monteCarlo = {
    Conservative: { p10:[1.00,1.00,1.01,1.01,1.01,1.02,1.02,1.02,1.03,1.03,1.04,1.04], p50:[1.00,1.01,1.02,1.03,1.04,1.05,1.06,1.07,1.08,1.09,1.10,1.10], p90:[1.00,1.02,1.04,1.06,1.08,1.10,1.12,1.14,1.16,1.18,1.20,1.22] },
    Moderate:     { p10:[1.00,0.99,0.98,0.99,1.00,1.01,1.02,1.03,1.04,1.05,1.06,1.07], p50:[1.00,1.01,1.03,1.05,1.07,1.09,1.11,1.13,1.15,1.17,1.19,1.22], p90:[1.00,1.03,1.06,1.10,1.13,1.17,1.21,1.25,1.29,1.33,1.37,1.42] },
    Aggressive:   { p10:[1.00,0.97,0.94,0.93,0.95,0.97,0.99,1.01,1.03,1.06,1.08,1.10], p50:[1.00,1.02,1.05,1.08,1.11,1.14,1.17,1.21,1.25,1.29,1.33,1.38], p90:[1.00,1.05,1.10,1.16,1.22,1.28,1.34,1.40,1.46,1.52,1.58,1.65] },
  };

  const assetColors = { "NIFTY 50":"#B8973A","Corporate Bonds":"#6EB5FF","Gold BEES":"#F0CC77","Small Cap":"#B07AFF","NASDAQ 100":"#5ECFA0" };
  const months = ["M1","M2","M3","M4","M5","M6","M7","M8","M9","M10","M11","M12"];

  const drawAllocation = () => {
    const canvas = canvasRef.current; if(!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0,0,W,H);
    const alloc = profiles[activeProfile].alloc;
    const entries = Object.entries(alloc).filter(([,v])=>v>0);
    const cx = W/2, cy = H/2 - 10, r = Math.min(W,H)*0.32, inner = r*0.52;
    let angle = -Math.PI/2;
    // Draw donut segments
    entries.forEach(([name, pct]) => {
      const sweep = (pct/100)*Math.PI*2;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle)*inner, cy + Math.sin(angle)*inner);
      ctx.arc(cx,cy,r,angle,angle+sweep);
      ctx.arc(cx,cy,inner,angle+sweep,angle,true);
      ctx.closePath();
      ctx.fillStyle = assetColors[name]; ctx.fill();
      ctx.strokeStyle = "rgba(12,12,16,0.7)"; ctx.lineWidth=2; ctx.stroke();
      // Label
      const mid = angle + sweep/2;
      const lx = cx + Math.cos(mid)*(r+16), ly = cy + Math.sin(mid)*(r+16);
      ctx.fillStyle = assetColors[name];
      ctx.font = "bold 9px IBM Plex Mono,monospace"; ctx.textAlign = "center";
      ctx.fillText(pct+"%", lx, ly);
      angle += sweep;
    });
    // Center label
    ctx.fillStyle = profiles[activeProfile].color;
    ctx.font = "bold 13px Playfair Display,serif"; ctx.textAlign = "center";
    ctx.fillText(activeProfile, cx, cy-4);
    ctx.fillStyle = "rgba(154,163,178,0.6)";
    ctx.font = "8px IBM Plex Mono,monospace";
    ctx.fillText("AHAM Portfolio", cx, cy+12);
    // Legend
    let lx = 12, ly = H - 40;
    entries.forEach(([name,pct])=>{
      ctx.fillStyle = assetColors[name];
      ctx.fillRect(lx,ly,10,10);
      ctx.fillStyle = "rgba(154,163,178,0.8)"; ctx.font="8px IBM Plex Mono,monospace"; ctx.textAlign="left";
      ctx.fillText(name+" "+pct+"%", lx+14, ly+9);
      lx += ctx.measureText(name+" "+pct+"%").width + 28;
      if(lx > W-80) { lx=12; ly+=16; }
    });
  };

  const drawMonteCarlo = (progress=1) => {
    const canvas = canvasRef.current; if(!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    const pad = {l:44,r:20,t:18,b:36};
    ctx.clearRect(0,0,W,H);
    const mc = monteCarlo[activeProfile];
    const allVals = [...mc.p10,...mc.p50,...mc.p90];
    const minV = Math.min(...allVals)*0.98, maxV = Math.max(...allVals)*1.02;
    const pts = Math.floor(12 * progress) + 1;
    const toX = i => pad.l + (i/11)*(W-pad.l-pad.r);
    const toY = v => pad.t + (1-(v-minV)/(maxV-minV))*(H-pad.t-pad.b);
    // Grid
    for(let i=0;i<=4;i++){
      const y=pad.t+i*(H-pad.t-pad.b)/4;
      ctx.strokeStyle="rgba(184,151,58,0.07)"; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(pad.l,y); ctx.lineTo(W-pad.r,y); ctx.stroke();
      const v = (maxV-i*(maxV-minV)/4).toFixed(2);
      ctx.fillStyle="rgba(154,163,178,0.45)"; ctx.font="8px IBM Plex Mono,monospace"; ctx.textAlign="right";
      ctx.fillText(v+"x",pad.l-3,y+3);
    }
    // Band fill (p10 to p90)
    ctx.beginPath();
    mc.p90.slice(0,pts).forEach((v,i)=>{ i===0?ctx.moveTo(toX(i),toY(v)):ctx.lineTo(toX(i),toY(v)); });
    for(let i=Math.min(pts-1,11);i>=0;i--) ctx.lineTo(toX(i),toY(mc.p10[i]));
    ctx.closePath();
    ctx.fillStyle = profiles[activeProfile].color+"1A"; ctx.fill();
    // Draw 3 lines
    [["p10","90th Percentile"],["p50","Median"],["p90","10th Percentile"]].forEach(([k,label],li)=>{
      const opacities=[0.4,1,0.4];
      const widths=[1,2,1];
      ctx.beginPath();
      mc[k].slice(0,pts).forEach((v,i)=>{ i===0?ctx.moveTo(toX(i),toY(v)):ctx.lineTo(toX(i),toY(v)); });
      ctx.strokeStyle = profiles[activeProfile].color+(li===1?"":"66");
      ctx.lineWidth=widths[li]; ctx.stroke();
      if(progress>=1){
        const last=mc[k][11], tx=toX(11), ty=toY(last);
        ctx.beginPath(); ctx.arc(tx,ty,3,0,Math.PI*2);
        ctx.fillStyle=profiles[activeProfile].color+(li===1?"":"88"); ctx.fill();
        if(li===1){
          ctx.fillStyle=profiles[activeProfile].color;
          ctx.font="bold 9px IBM Plex Mono,monospace"; ctx.textAlign="left";
          ctx.fillText(last.toFixed(2)+"x",tx+6,ty+3);
        }
      }
    });
    // X labels
    months.slice(0,pts).forEach((m,i)=>{
      ctx.fillStyle="rgba(154,163,178,0.45)"; ctx.font="8px IBM Plex Mono,monospace"; ctx.textAlign="center";
      ctx.fillText(m,toX(i),H-pad.b+14);
    });
    ctx.fillStyle="rgba(154,163,178,0.55)"; ctx.font="9px IBM Plex Mono,monospace"; ctx.textAlign="center";
    ctx.fillText("Monte Carlo Simulation — 12-Month Portfolio Growth Projection",W/2,H-4);
  };

  const startAnim = () => {
    progressRef.current=0;
    if(animRef.current) cancelAnimationFrame(animRef.current);
    const start=performance.now(), dur=1600;
    const step=now=>{
      const t=Math.min((now-start)/dur,1);
      progressRef.current=t;
      drawMonteCarlo(t);
      if(t<1) animRef.current=requestAnimationFrame(step);
    };
    animRef.current=requestAnimationFrame(step);
  };

  useEffect(()=>{
    const c=canvasRef.current; if(!c) return;
    c.width=c.offsetWidth||580; c.height=200;
    c.style.width="100%"; c.style.height="200px";
    if(activeTab==="allocation") drawAllocation();
    else startAnim();
    return()=>{ if(animRef.current) cancelAnimationFrame(animRef.current); };
  },[activeTab, activeProfile]);

  const col = profiles[activeProfile].color;
  const m = profiles[activeProfile].metrics;

  return (
    <div style={{background:"var(--ink)",border:"1px solid rgba(184,151,58,0.12)",padding:"14px",marginTop:"12px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"10px",flexWrap:"wrap",gap:"6px"}}>
        <span style={{fontFamily:"var(--mono)",fontSize:"8px",letterSpacing:"2px",color:"var(--gold)",textTransform:"uppercase"}}>AHAM Interactive Model</span>
        <div style={{display:"flex",gap:"4px"}}>
          {["allocation","montecarlo"].map(t=>(
            <button key={t} onClick={()=>setActiveTab(t)} style={{fontFamily:"var(--mono)",fontSize:"8px",letterSpacing:"1px",padding:"3px 9px",border:`1px solid ${activeTab===t?"rgba(184,151,58,0.5)":"rgba(184,151,58,0.15)"}`,background:activeTab===t?"rgba(184,151,58,0.1)":"transparent",color:activeTab===t?"var(--gold2)":"var(--text2)",cursor:"pointer",textTransform:"uppercase",transition:"all 0.2s"}}>
              {t==="allocation"?"Allocation":"Monte Carlo"}
            </button>
          ))}
        </div>
      </div>
      <div style={{display:"flex",gap:"4px",marginBottom:"10px"}}>
        {Object.keys(profiles).map(p=>(
          <button key={p} onClick={()=>setActiveProfile(p)} style={{flex:1,fontFamily:"var(--mono)",fontSize:"8px",letterSpacing:"1px",padding:"5px",border:`1px solid ${activeProfile===p?profiles[p].color:"rgba(184,151,58,0.15)"}`,background:activeProfile===p?profiles[p].color+"18":"transparent",color:activeProfile===p?profiles[p].color:"var(--text2)",cursor:"pointer",textTransform:"uppercase",transition:"all 0.2s"}}>
            {p}
          </button>
        ))}
      </div>
      <canvas ref={canvasRef} style={{width:"100%",height:"200px",display:"block"}}/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"2px",marginTop:"8px"}}>
        {[["CAGR",m.cagr],["Volatility",m.vol],["Sharpe",m.sharpe],["Max DD",m.maxDD]].map(([k,v])=>(
          <div key={k} style={{padding:"8px 10px",background:"rgba(184,151,58,0.03)",border:"1px solid rgba(184,151,58,0.1)",textAlign:"center"}}>
            <div style={{fontFamily:"var(--serif)",fontSize:"16px",fontWeight:600,color:col}}>{v}</div>
            <div style={{fontFamily:"var(--mono)",fontSize:"7px",color:"var(--text2)",letterSpacing:"1.5px",textTransform:"uppercase",marginTop:"3px"}}>{k}</div>
          </div>
        ))}
      </div>
    </div>
  );
}


const TIMELINE = [
  { year:"2021", month:"Jul", label:"Started BBA", detail:"Bachelor of Business Administration — Sri Ramakrishna College of Arts and Science, Coimbatore (Autonomous; affiliated to Bharathiar University)", type:"edu" },
  { year:"2024", month:"Mar", label:"Completed BBA", detail:"Bachelor of Business Administration — Sri Ramakrishna College of Arts and Science, Coimbatore", type:"edu" },
  { year:"2024", month:"Sep", label:"Started MBA", detail:"MBA in Finance & Business Analytics — Sri Ramakrishna College of Arts and Science, Coimbatore (Autonomous; affiliated to Bharathiar University)", type:"edu" },
  { year:"2025", month:"Jan", label:"Power BI Workshop", detail:"Power BI Workshop — SRCAS (Online)", type:"cert" },
  { year:"2025", month:"Jun", label:"Internship — ITI Securities", detail:"Financial Analyst Intern — ITI Securities Broking Pvt. Ltd., Coimbatore. Supported trading & settlement analysis, MIS & reconciliation reports, risk monitoring, compliance checks and capital markets operations.", type:"work" },
  { year:"2025", month:"Jul", label:"AHAM — Live Industry Project", detail:"Designed and deployed the AHAM portfolio automation framework at ITI Securities. Co-authored and submitted for publication — the only live industry project in this portfolio.", type:"project" },
  { year:"2025", month:"Dec", label:"Financial Statement Analysis", detail:"Advanced Financial Statement Performance & Ratio Analysis — Udemy (Online)", type:"cert" },
  { year:"2026", month:"Jan", label:"AI & Data Visualisation", detail:"AI for All & Data Visualisation — GUVI (Online)", type:"cert" },
  { year:"2026", month:"Jan", label:"Financial Modelling Certification", detail:"Financial Modelling & Valuation — Internshala (Online)", type:"cert" },
  { year:"2026", month:"Feb", label:"LBO · DCF · Banking Models", detail:"Completed PVR INOX LBO, Hero MotoCorp DCF, HDFC Bank integrated banking model — all independent practice on public data", type:"project" },
  { year:"2026", month:"Mar", label:"M&A · FP&A · ML Models", detail:"Completed Mizuho × Avendus buy-side M&A model, Nestlé India FP&A model and NIFTY 50 ML forecasting study — independent practice", type:"project" },
  { year:"2026", month:"Apr", label:"Graduating MBA", detail:"Final semester — actively seeking entry-level roles in FP&A, Corporate Finance, Valuation or Investment Banking", type:"edu", active:true },
];

function Timeline() {
  const [visible, setVisible] = useState(new Set());
  const refs = useRef([]);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setVisible(v => new Set([...v, +e.target.dataset.idx]));
      });
    }, { threshold: 0.3 });
    refs.current.forEach(r => r && obs.observe(r));
    return () => obs.disconnect();
  }, []);
  const typeColor = { edu:"#B8973A", work:"#5ECFA0", cert:"#6EB5FF", project:"#B07AFF" };
  const typeLabel = { edu:"Education", work:"Experience", cert:"Certification", project:"Project" };
  return (
    <div className="timeline-wrap">
      <div className="timeline-line"/>
      {TIMELINE.map((t,i) => (
        <div
          key={i} ref={el=>refs.current[i]=el} data-idx={i}
          className={`tl-item${i%2===0?" tl-left":" tl-right"}${visible.has(i)?" tl-vis":""}`}
        >
          <div className="tl-dot" style={{background:typeColor[t.type], boxShadow:`0 0 0 3px rgba(${t.type==="work"?"61,168,122":t.type==="cert"?"110,181,255":t.type==="project"?"176,122,255":"184,151,58"},0.2)`}}/>
          <div className={`tl-card${t.active?" tl-active":""}`}>
            <div className="tl-meta">
              <span className="tl-date">{t.month} {t.year}</span>
              <span className="tl-type" style={{color:typeColor[t.type]}}>{typeLabel[t.type]}</span>
            </div>
            <div className="tl-label">{t.label}</div>
            <div className="tl-detail">{t.detail}</div>
            {t.active && <div className="tl-now">Now</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

function useTypewriter(phrases) {
  const [txt, setTxt] = useState(""); const [pi, setPi] = useState(0); const [ci, setCi] = useState(0); const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = phrases[pi];
    const id = setTimeout(() => {
      if (!del) { if (ci < cur.length) { setTxt(cur.slice(0,ci+1)); setCi(c=>c+1); } else setTimeout(()=>setDel(true),2200); }
      else { if (ci > 0) { setTxt(cur.slice(0,ci-1)); setCi(c=>c-1); } else { setDel(false); setPi(i=>(i+1)%phrases.length); } }
    }, del ? 34 : 72);
    return () => clearTimeout(id);
  }, [ci, del, pi, phrases]);
  return txt;
}
function useStuck() {
  const [s, setS] = useState(false);
  useEffect(() => { const fn = () => setS(window.scrollY > 60); window.addEventListener("scroll", fn, {passive:true}); return () => window.removeEventListener("scroll", fn); }, []);
  return s;
}
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("vis"); }), {threshold:0.07});
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

const PHRASES = ["₹1.3L Cr Enterprise Value Modelled.", "3 Models. 2 Deployments. 1 Published Paper.", "DCF · LBO · Integrated Banking — from scratch.", "Available from April 2026."];

const TICKER_ITEMS = [
  "Financial Modelling","DCF Valuation","LBO Analysis","Corporate Finance","Investment Banking",
  "Capital Structure","Equity Research","M&A Analysis","3-Statement Model","WACC · CAPM",
  "Basel III · NII","Comparable Companies","Scenario Analysis","Finance Operations","MIS & Reporting",
  "Financial Modelling","DCF Valuation","LBO Analysis","Corporate Finance","Investment Banking",
  "Capital Structure","Equity Research","M&A Analysis","3-Statement Model","WACC · CAPM",
  "Basel III · NII","Comparable Companies","Scenario Analysis","Finance Operations","MIS & Reporting",
];

// SVG icon components for competencies — no emojis
const IconValuation = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="13" width="3" height="9" fill="#B8973A" opacity="0.7"/>
    <rect x="7" y="9" width="3" height="13" fill="#B8973A" opacity="0.85"/>
    <rect x="12" y="5" width="3" height="17" fill="#D4AF55"/>
    <rect x="17" y="2" width="3" height="20" fill="#F0CC77"/>
    <path d="M2 13L5 9L10 7L15 4L20 2" stroke="#B8973A" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);
const IconIB = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M3 21V9L12 3L21 9V21" stroke="#B8973A" strokeWidth="1.4" fill="none"/>
    <path d="M9 21V15H15V21" stroke="#D4AF55" strokeWidth="1.4" fill="none"/>
    <path d="M3 9H21" stroke="#B8973A" strokeWidth="0.8" strokeOpacity="0.4"/>
    <rect x="7" y="10" width="3" height="3" fill="rgba(184,151,58,0.3)"/>
    <rect x="14" y="10" width="3" height="3" fill="rgba(184,151,58,0.3)"/>
  </svg>
);
const IconFPA = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="20" height="16" rx="1" stroke="#B8973A" strokeWidth="1.4" fill="none"/>
    <path d="M6 12L9 8L13 11L18 6" stroke="#D4AF55" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 18H22" stroke="#B8973A" strokeWidth="0.7" strokeOpacity="0.35"/>
    <path d="M7 22H17" stroke="#B8973A" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);
const IconAnalysis = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="10" cy="10" r="7" stroke="#B8973A" strokeWidth="1.4" fill="none"/>
    <path d="M15.5 15.5L21 21" stroke="#D4AF55" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M7 10H13M10 7V13" stroke="#B8973A" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);
const IconWorkflow = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="1" y="8" width="6" height="4" rx="0.5" stroke="#B8973A" strokeWidth="1.3" fill="none"/>
    <rect x="9" y="4" width="6" height="4" rx="0.5" stroke="#B8973A" strokeWidth="1.3" fill="rgba(184,151,58,0.1)"/>
    <rect x="9" y="14" width="6" height="4" rx="0.5" stroke="#B8973A" strokeWidth="1.3" fill="rgba(184,151,58,0.1)"/>
    <rect x="17" y="8" width="6" height="4" rx="0.5" stroke="#D4AF55" strokeWidth="1.3" fill="rgba(212,175,85,0.12)"/>
    <path d="M7 10H9M15 6L17 10M15 16L17 10" stroke="#B8973A" strokeWidth="1.1" strokeLinecap="round"/>
  </svg>
);
const IconMIS = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="3" width="20" height="14" rx="1" stroke="#B8973A" strokeWidth="1.4" fill="none"/>
    <rect x="5" y="6" width="6" height="4" fill="rgba(184,151,58,0.2)"/>
    <rect x="13" y="6" width="6" height="4" fill="rgba(184,151,58,0.1)"/>
    <path d="M5 13H19" stroke="#B8973A" strokeWidth="0.8" strokeOpacity="0.4"/>
    <path d="M9 17V21M15 17V21M6 21H18" stroke="#B8973A" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);
const IconCapMarkets = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="#B8973A" strokeWidth="1.4" fill="none"/>
    <path d="M12 3V12L17 7" stroke="#D4AF55" strokeWidth="1.4" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="1.8" fill="#B8973A"/>
    <path d="M3 12H21M12 3C8 3 5 7 5 12M12 3C16 3 19 7 19 12" stroke="#B8973A" strokeWidth="0.7" strokeOpacity="0.3"/>
  </svg>
);
const IconComm = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M3 4H16C16.6 4 17 4.4 17 5V13C17 13.6 16.6 14 16 14H8L4 18V14H3C2.4 14 2 13.6 2 13V5C2 4.4 2.4 4 3 4Z" stroke="#B8973A" strokeWidth="1.4" fill="none"/>
    <path d="M20 8H21C21.6 8 22 8.4 22 9V17C22 17.6 21.6 18 21 18H20V21L16 18H10C9.4 18 9 17.6 9 17V15" stroke="#B8973A" strokeWidth="1.2" strokeOpacity="0.5" fill="none"/>
    <path d="M5 8H14M5 11H11" stroke="#D4AF55" strokeWidth="1.1" strokeLinecap="round"/>
  </svg>
);

const COMPETENCIES = [
  { icon:<IconValuation/>, title:"Financial Modelling & Valuation", desc:"DCF, LBO, P/B and 3-statement models built end-to-end on public filings. Structured to IB and corporate finance standards — from assumptions to output.", tag:"Core · IB / Corp Finance" },
  { icon:<IconIB/>, title:"Investment Banking Fundamentals", desc:"Capital structure analysis, precedent transactions, comparable companies and deal support modelling. Built to understand how IB analysts think and structure work.", tag:"IB Targeted" },
  { icon:<IconFPA/>, title:"FP&A · Budgeting · Forecasting", desc:"Financial planning frameworks, budget models, variance analysis and scenario modelling that connect business strategy to financial outcomes.", tag:"Corporate Finance" },
  { icon:<IconAnalysis/>, title:"Financial Analysis for Decisions", desc:"Turning financial data into structured business insight — performance analysis, investment theses and management-ready recommendations.", tag:"Strategic Analysis" },
  { icon:<IconWorkflow/>, title:"Finance Process & Reporting Automation", desc:"Designing automated finance reporting pipelines — MIS generation, data workflows and dashboards — so finance teams operate at higher leverage.", tag:"Finance Operations" },
  { icon:<IconMIS/>, title:"MIS, Dashboard & Reporting", desc:"Power BI dashboards and Excel MIS systems with live KPIs, variance tracking and management reporting structured for banks, NBFCs and corporates.", tag:"Reporting & Control" },
  { icon:<IconCapMarkets/>, title:"Capital Markets & Banking", desc:"Banking models covering NII, NIM, Basel III capital adequacy and asset quality. Foundation for roles in banking, treasury and financial services.", tag:"Banking Domain" },
  { icon:<IconComm/>, title:"Communication & Stakeholder Clarity", desc:"Translating financial complexity into clear, structured outputs — reports, frameworks and presentations that enable confident decisions.", tag:"Leadership Skill" },
];

// SVG icons for edge items — no emojis
const EdgeIcon1 = () => (
  <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
    <path d="M14 2L26 8V16C26 22 20.5 26.5 14 28C7.5 26.5 2 22 2 16V8Z" stroke="#B8973A" strokeWidth="1.3" fill="none"/>
    <path d="M8 14L12 18L20 10" stroke="#D4AF55" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const EdgeIcon2 = () => (
  <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
    <rect x="2" y="4" width="16" height="12" rx="1" stroke="#B8973A" strokeWidth="1.3" fill="none"/>
    <rect x="10" y="12" width="16" height="12" rx="1" stroke="#B8973A" strokeWidth="1.3" fill="rgba(184,151,58,0.07)"/>
    <path d="M5 10H15M5 13H11" stroke="#D4AF55" strokeWidth="1.1" strokeLinecap="round"/>
  </svg>
);
const EdgeIcon3 = () => (
  <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
    <rect x="2" y="2" width="24" height="18" rx="1" stroke="#B8973A" strokeWidth="1.3" fill="none"/>
    <path d="M5 13L9 9L13 12L18 7L23 9" stroke="#D4AF55" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 20H26" stroke="#B8973A" strokeWidth="0.7" strokeOpacity="0.3"/>
    <path d="M8 22V24M14 22V24M20 22V24" stroke="#B8973A" strokeWidth="1.1" strokeLinecap="round"/>
  </svg>
);

const EDGE_ITEMS = [
  {
    icon:<EdgeIcon1/>,
    title:"Three models. <em>Three sectors.</em> All from scratch.",
    body:"DCF on an auto OEM, LBO on a media conglomerate, integrated banking model on India's largest private bank — <strong>built independently from public filings</strong>, not templates. That breadth across BFSI, Auto and M&E is rare at analyst entry level. And every number came from working through real annual reports.",
    tag:"Sector Breadth",
  },
  {
    icon:<EdgeIcon2/>,
    title:"Deployed. Published. <em>Not just modelled.</em>",
    body:"Two automation workflows are live and running. A research paper on the <strong>AHAM portfolio framework is co-authored and published</strong>. This is not coursework — it is production-grade work done during an internship at a live brokerage, documented to academic standard and validated by a faculty guide.",
    tag:"Real Output",
  },
  {
    icon:<EdgeIcon3/>,
    title:"Finance analyst who can <em>also build.</em>",
    body:"Most finance candidates can model. Fewer can <strong>automate the workflow around the model</strong>. The ability to build n8n pipelines, REST API integrations and Python analytics tools on top of financial frameworks means I reduce manual overhead in any team I join — from day one.",
    tag:"Analyst + Builder",
  },
];

const TAG_MAP = {
  fin:["t-fin","Valuation"], lbo:["t-lbo","LBO / M&A"],
  auto:["t-auto","Automation"], ml:["t-ml","ML Analytics"], intern:["t-intern","Internship"],
  ma:["t-lbo","M&A · Buy-Side"], fpa:["t-fin","FP&A"],
};
const FILTER_MAP = {
  "All": () => true,
  "Valuation": p => p.tags.includes("fin") || p.tags.includes("lbo") || p.tags.includes("fpa"),
  "M&A": p => p.tags.includes("ma") || p.tags.includes("lbo"),
  "Automation": p => p.tags.includes("auto"),
  "Analytics": p => p.tags.includes("ml"),
  "Internship": p => p.tags.includes("intern"),
};

// Tool logos as inline SVG — recognisable symbols for each tool
const ToolLogos = {
  "n8n": () => (
    <svg width="14" height="14" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="6" fill="#EA4B71" opacity="0.15"/>
      <text x="4" y="22" fontFamily="monospace" fontSize="13" fontWeight="700" fill="#EA4B71">n8n</text>
    </svg>
  ),
  "Excel": () => (
    <svg width="14" height="14" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="4" fill="#217346" opacity="0.15"/>
      <path d="M6 8H20L26 14V26H6Z" stroke="#217346" strokeWidth="2" fill="none"/>
      <path d="M10 14L16 22M16 14L10 22" stroke="#217346" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  "Power BI": () => (
    <svg width="14" height="14" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="4" fill="#F2C811" opacity="0.15"/>
      <rect x="6" y="18" width="4" height="8" fill="#F2C811"/>
      <rect x="12" y="13" width="4" height="13" fill="#F2C811" opacity="0.8"/>
      <rect x="18" y="8" width="4" height="18" fill="#F2C811" opacity="0.9"/>
      <rect x="24" y="4" width="4" height="22" fill="#F2C811"/>
    </svg>
  ),
  "Python": () => (
    <svg width="14" height="14" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="4" fill="#3776AB" opacity="0.12"/>
      <path d="M10 6C10 6 10 10 16 10C22 10 22 6 22 6L22 16C22 16 22 20 16 20C10 20 10 16 10 16V12" stroke="#3776AB" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M22 26C22 26 22 22 16 22C10 22 10 26 10 26L10 20" stroke="#FFD43B" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <circle cx="14" cy="8.5" r="1.2" fill="#FFD43B"/>
      <circle cx="18" cy="23.5" r="1.2" fill="#3776AB"/>
    </svg>
  ),
  "SQL": () => (
    <svg width="14" height="14" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="4" fill="#336791" opacity="0.12"/>
      <ellipse cx="16" cy="9" rx="9" ry="4" stroke="#336791" strokeWidth="1.6" fill="none"/>
      <path d="M7 9V23C7 25.2 11 27 16 27C21 27 25 25.2 25 23V9" stroke="#336791" strokeWidth="1.6" fill="none"/>
      <path d="M7 16C7 18.2 11 20 16 20C21 20 25 18.2 25 16" stroke="#336791" strokeWidth="1.2" strokeOpacity="0.6"/>
    </svg>
  ),
  "SPSS": () => (
    <svg width="14" height="14" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="4" fill="#CC0000" opacity="0.1"/>
      <text x="4" y="22" fontFamily="monospace" fontSize="11" fontWeight="700" fill="#CC0000">SPSS</text>
    </svg>
  ),
  "TensorFlow": () => (
    <svg width="14" height="14" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="4" fill="#FF6F00" opacity="0.12"/>
      <path d="M16 4L28 11V18L16 25L4 18V11Z" stroke="#FF6F00" strokeWidth="1.6" fill="none"/>
      <path d="M16 4V25M4 11L28 11M4 18L28 18" stroke="#FF6F00" strokeWidth="0.8" strokeOpacity="0.4"/>
    </svg>
  ),
  "XGBoost": () => (
    <svg width="14" height="14" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="4" fill="#189AB4" opacity="0.12"/>
      <path d="M8 24L14 12L18 18L22 10L26 18" stroke="#189AB4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  ),
  "DCF": () => (
    <svg width="14" height="14" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="4" fill="#B8973A" opacity="0.12"/>
      <path d="M6 24L10 16L14 19L18 10L22 14L26 6" stroke="#B8973A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  ),
  "LBO": () => (
    <svg width="14" height="14" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="4" fill="#FF9F6B" opacity="0.12"/>
      <rect x="6" y="14" width="5" height="12" fill="#FF9F6B" opacity="0.7"/>
      <rect x="14" y="10" width="5" height="16" fill="#FF9F6B" opacity="0.85"/>
      <rect x="22" y="6" width="5" height="20" fill="#FF9F6B"/>
    </svg>
  ),
};

const getToolLogo = (toolName) => {
  const key = Object.keys(ToolLogos).find(k => toolName.toLowerCase().includes(k.toLowerCase()));
  return key ? ToolLogos[key] : null;
};

const ROBO_IMG = "data:image/png;base64,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sAy2NzmnQdRC8SvSekVsg5TLb9n2UtVPFJHxjVvkDRIC12GnuK82g6a/5EXsKxtM9yya/wCRF7CsbTKCIiICIiAiIgIiILplNMpplNMoIiIgIiICIiAmiLkg46ZRXTKiAiIgIiICIiArpnuUV0ygiIiAiIgIiICIiC6Z7lFdMqICIiAiIgIiICumVFdMoGii5LigIiICIiAiIgumU0ymmU60EREQEREBERAW02eqYKerfxn7jHswCVq1yQbmW32p8jnsuAYCc4yDhcfNts/aY/yWn0yog3Pm22ftMf5J5ttn7TH+S0yINz5ttn7TH+S5RW+1Mka99wDwDnGQMrSIg9ny+i7VD705fRdqh968YiD2fL6LtUPvTl9F2qH3rxiumUHsuX0XaofenL6LtUPvXjEQez5fRdqh96cvou1Q+9eMRB7Pl9F2qH3py+i7VD714xEHs+X0XaofenL6LtUPvXjEQez5fRdqh96cvou1Q+9eN0yqg9jy+i7VD705fRdqh968YiD2fL6LtUPvTl9F2qH3rxiIPU3W4Uht8rGzMe5zcAA5XlkRAV0yor1oGmVFdMqICIiAiIgIiILomme5VTTKCIiICIiAiIgIiILpnuUV0yogIiICIiAiIgK6Z7lFdMoIiIgIiICIiAiIgumU0TrVQcUREBERAREQFdFFyQTTKiumVEBERAREQEREBXTPcorplB2CB5AJ3BkdbwD/AJq8B/rj/iN/NSr+kOXUg7uA/wBcf8Rv5pwH+uP+I3810og5SMczAeNfbkLiu2T6PD/eXUg2CLs4032sniKcab7WTxFB1ouzjTfayeIpxpvtZPEUGLX/ACIvYVjZ1zhZVxc5wiLyScHpWLnnZQVcURAREQEREBERBetOtM87KZ52UEREQEREBERAXJcUQXr6FFc87KiAiIgIiICIiArnXOFFc87KCIiICIiAiIgIiILnXOFVM87KiAiIgIiICIiAr19CiuedlBVxVyogIiICIiAiIg5KdfQmdUzzsoIiIgIiICIiAuS4rkgnX0KK552VEBERAREQEREBXrzhRXPOygq4oiAiIgIiICIiC9fQqpnnZVQcUREBERAREQFetRXPOygdfQornnZUQEREBERAREQclOvOEymedlBEREBERAREQEREFzrnCiuedlRAREQEREBERAV684UVzzsoIiIgIiICIiAi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cAY1xyVgT7T7etzxrldsun5TvPac8Rrg7eBx1GPOmnNWvF62mt8sEnLa+lkE8lVD0s/SvG697e84wU+Xv3qsvVXXyZNtu1EVoqL7vU/IqusqKgUmXRx075Wu3Wb/ADieFpqFlWnyTPv1ofX7N3mSvDpRHTtqKE0xIxAS52XnGON1by8xLcduRcaW8STXblkb3wwTkOLw5xLnMHt3nHHWu6PajygBk1bHdLyIw7jSvG8GAtMbfYAN2MK6e/fRObdweRvaU10VLVV1qp9+djMmZznFhdE0yBobnA48eQcFef2t2IumzloprrU1FFUUVTO+GGWne45LSRk5AxnHR0jrWJJtltS+oE5vtaJBnBY/dxkxnQDoGYo/Cum87UX+80TKG53Seqp45OKGPxje11OOnGdFjqR6tOiIqOSmdc4TKZ52UEREQEREBERAREQXOucKK552VEBERAREQEREBXOqiuedlBEREBERAREQEREF61VM87KZQRERAREQEREBclxVygZ1UVzzsqICIiAiIgIiICudc4UVzzsoIiIgIiICIiDYIiICIiDpr/kRewrG13+vOVk1/wAiL2FY2DnCAM506UGepVcUF11TXCiILrjuTXAURBTnRDnrURBdc96a570wcpg5QBnqQZ1QKILrgprjuURBdcIc6KIgpz1oc516VUQcdc/rZVGepMHOFEFbnXCa4KiILrjuTXCiILrohz1qIgpznVNd/rzlVTBzjrQBnOiDKiILrqmuO5REF1x3JrgKIgpz1oc9aiILrv8AXnKDOdEwc461UEGepBnVREF1x3JrjuURBdcI7OmVEQU5601z3qK4OcIAznTpQZ6kxqogoymuFEQXXHcmuFEQU50Q561EQXXPemue9MHKYOcIAz1LNjrmysEddCagAYDwd2Ro9uuR7Vgog9PFQ2I2qmqIJXmscXYhfqXYOm8Bpp/mkuXUzXSMAdkBumMtA/0Xml6AuLmREkk8Jmp+6ECP5xvtC/UmxOyNTtFbHVENXFA2IYw7GuGb3WQvy0w4IK+47NeWCCw0XAt9fJAHjMgNI1+pbunUgrzs/h+Oqn7szGvB898cy041eFM0TVTF72+jE8ulvltVsloJpeM6KePXORq3K+ML6N5T9tqLaiieRPJPVyzNc4mHcGGjC+dBrnZwCcDJWzI0TRhzExbV0/A8GrCy801UzH3ptE8bcmRLGH7kL4wYMA5x3auytUaWzDO7d6on/wBl/wDNc7uXciYwE4MvR+C1C7XsM809sHyblOf/APL/APJceBbu3z/4f/5LCRBncC3bv0+fH/tv/knAt279Pnx/7b/5LBRBmmC3aZr5/wDDf/JUwW7rr5/8N/8AJYKIM8QW0nnXGcf/AOX/AOS2lkt+z83KuV3ObLYiQTDw9056RzjvHuXnlMHOEHqIImMLoYoxyXBO9j9XqflYyxbQ53IpGZOBINPwWUg9o8ebfJ7HVWACYVoMN2qx85CT/wCBj9Vh+t1rF8nE1bJdJbWylZV22qZ/2hDKd2NsQ6ZS79Ut6itBbrlXW8VDKOpfC2phdBOBgh7D0ggqQXGtgt9Rb4ah8dNUOaZmDTfLejJ6cdy82cnXOHiUTafFN7ze/wBfWnla3CODujM0xXRXrFo4cv8Aqed/Xi5XuKhhu9VFbJ31FE2VwglcMFzM6FdUWRTudGwF+cO0zhpC6Fd5zWSlpIIifqPulehTHhpiJm7iqm8zNrMS4UtEJwH1XJpC0FzOCSAfwWPJbpnAvppI6pobk8M84DvacFYRyqHOY8PYSHDBBHSFkia7/XnKa571sGyx3BwiqyI6robP1OPUHfEsGWKSKV0UjCJGnBCDiM9SDOqiILrjuTXHcoiC64W6oNp7nRUXJIxCYuEIxkHQAuPUR9o5aREHpqjbW7SvbIaeiY9jQ2JwjdlgBDhgFxGhDSCVGba31hyx8DZcNBdw9SRk5Pec6rzSuDnCD0sG2t6gk3oWU7CfnBwy7fOGtyck67rd3TqWvuF/ra+KKOZseYgOewvDnY63a6rVYOVELvTM21u7J3SxxUoBa5rmBhwWuxnOudcdKx7jtVc7hQSUlS2ExvBDjzsnLt4dfSCtCiEacF1x3JrjuURBTnRDnrURBTnOvSmuevOVVMHOEAZ6kbnXCiILrgrOgtr3wNe+ZjN4Bwbuk6FYC37PmYv3TP6QgwvNnVypngKebP8A1TfAVnIgwfNn/qm+Ap5sz/8A2meArORBqaykkp91wkEgcdCPWsYZ6ltbrk0bf3g/ktSgoz1JrgqIguuE1x3KIguuiOzplREFOc6prv8AXnKFMHOEAZzogz1KIguuqa47lEQXXHcmuAoiCnOiHPWoiC6570Gc96YOcKoIM9SDOqiILrhNcdyiILrhDnRREFOetNc96FMHKBrnvQZ6kwc4UQUZ1TXCiILrjuTXCn6qILrohz1qIgpznXpTnb/XnKqmDnCAM9SNzrhREF1wU1x3KIguuO5NdFEQbTgyfUTgyfUXWiDs4Mn1E4Mn1F1og6ri0tEQI6isXHOwsmv+RF7Csbr6UERclxQEREBERAREQXHOwmOdhOtVBxREQEREBERAXJcVyQTHOwor19KiAiIgIiICIiArjnYUV6+lBEREBERAREQEREFxzsKK9eMqICIiAiIgIiICuOdhRXrQRFyXFAREQEREBERBcJjnYVU60ERd1FS1NbUspaSnmqJ3nDIomF73H1ADJK7bjbLjbZOHcaCqopDkBtRC6MkjuICDEXoT81F+6Z/SF55bSoF2ttPT8uoZoY5mB9OaiFzN9h62k4y1BmItb5yl+yh/z/NZVf52oI4Ja61yUsdQzfhdNA9gkb62k4yEGQvbbAXDZe3Wyo861UjaipcYpmCFxHBx8nIB6V86ZWVb5I4o6UPklwGNDHEuJ0GBnVd8huscUsslskZFC8sleYXhrHggFrj1EEtyFjXT4otLpymZqy2JtKYiZ9XbtO2ma98dFKZKcVDxC8jdLmdRIK0S3FRa9oKsUrzaK/hVDSaYspX7sjRqXN05y1Mkb4pXxStMcjCQ5rxggjqIWTnmbzdxRcixzcF4IyMjPWFxRBERAREQFcc7Ci2NXY71R0zaurtFfTU7mhzZpaZ7GFpxhwJGMaoO2z/Q5P3g/kspaWkqZacnhkYPSCMgrYxG6y2+W4R2yR9HC4NfUCF5ja49RcNAUGSi1vnKX7OH/P8ANbGiotoq2jFZR2GrqaUkgTRUsj2ZHTzhogqHWOX90/8ApKwampraaTh1NIIJPqyMc0+4lc6MXa7SGjtlDNVTOaSYqaF0jy0dOgycINUi5zxSQSvhmjfHLGS17HghzSNCCD0EKIJjnYWwB8403DP0uBvNP2kY6vaFr+tcoJHxStkjfuOacgjqIQcEWbcI2SMbXQgCOXR7fqSdY9h6QsJAREQEREBXHOwor1oGOdhRXrUQEREBERAREQclMc7Ci7KeCWolEUMZkceoDKDrRZ3I6eH6bWBjutkQ4jvxOcJx7azSOhkk75Zjr+AAQYbI5HloY0uLugetegfFJHHEJGEfo2j3NC7I79Qmz09ByFkLml+ZRk7mfq5ydetR5Y2nDGyCTeIfoDgAjvwg7bZSmtrGU+cZBJOM4AGVlXex1tviZUlnEp5Pkyj3YI6lsfJoAdr6YH6kn9BXpa3aentO0FbbKqnxSxOBiMYyRlodghZZnKY+HlYzmHN48XhmnnwveJen8Lxfh2YxKslmr0V/1RXxjpaY/X+zq2D8l1TtDZ6+411f5tFPHmJhj3i44Jy7UYC+dL69sdtHVXmjurBmGlBbuxDr0Orl8hXkfD/93ONi1Ziq8TMeGLf0xbXXndxZzM5OvNV5fKRPhw7R4p//AFMxxtyjo6bnBM+ga9sZI38/hg6rSr0088ET21ckoAyOZg5yOroxhafzh/6Oh/gr1WlgrsghfNJusxlZXnD/ANHQ/wAFdlNXMfJh8FLCPWxmCgx5KGZjC/Q4WKvVbSX2G50dNGKakpzTU/BHBGC/UnJ968qgIiICuOdhRXr6UEREQEREBERAREQMa4RXrVQcUREBERAREQFcc7Ci5IJjnYUV61EBERAREQEREBXHOwor19KCIiICIiAiIg2C9dsJsPU7TUk9fJVGlooZOCXxw8VxfjeOhLWtaBqXOcAvIr6V5Hr/AA0tsulkmEcks0kc9JTmqbTid+rXsL3AxnI3dHjCDpq/JpA+1y1Nj2npbzLE173cngPBwzJIMmSWOwMjeAB6ivna+/7a3Kh2TtF0pYrFS7P8WgYKWnjqgeUSyxtLy6EDeIbxJBl53Ru6BfAEHTX/ACIvYVjaZWTX/Ii9hWNpnuQRERAREQEREBERBdMpplNMpplBEREBERAREQFyXFNEF0yommUQEREBERAREQFdMqK6Z7kEREQEREBERAREQXTPcorpnuUQEREBERAREQFdMqK6ZQVcVdFEBERAREQEREF0ymmU0ymmUG98n19h2Z2wob5UU5qI6biExD9Yujc0Dq01XvNn/KdYWWuKnvNhHGinfOeT0zJYnMLml0AEhJY14GC/pC+Sog+mbY7f7MXjYw2u2bJQUFzkjibNViNn3psYGmTHHhYO1e29vrbPYqS3U89VNb5pZ3uuUDJA8yMjbuuGSJSOH8sgLy+zbLG+oeL3LJHES0NMeTjLucdB1BbtlLsK0NkFzke4Tn9HIyVrTHr0kNKcS7XV21NRWQsjltFijDZGvJprbFE87pzjeaAcFfS6byp7Gi4T1NbZbjXmtqJ6pzqomUUb5MYZHEZdx4GMB2IzheKgdsK17d6Xf3YXtdmGQB7yQ5pGPVzh1KV/oLU1JkjmMEYyMRskYSA84Ibgjo3etL8jm21x8oNmqdubNtILZUcK00j201HhjGMla+R0GCD8gFzVlbXeU2z3rZO7WyC1VdPWXWXlNQ4lpjEzuTGQ9OSCYHFeUrKbYzE4pLhOcMYWOkD27zt4hw0Ycaa5XCyM2TbbBJcpnmqc4sdFz8taXDDwQ3GgT33lZmYm73NF5ULBT3x93livtQKxmKigkew00H9nMWGDPOGuh0wNF21flR2QFohjt+ykdPXMiLQ80kT9x/W7JJzvdJ00Xi2U2wLIg83KrkkELSWGN4Dn41GQNDleWuPJhcKjkuOT8R/CxnG7nTpwU5pEWjs+u3Lyn7J3Cir4ZrLUMa+inpaSHkkLhCHTTvYGvzzRiZudDjdXxpES2tzlYREQEREBfW6Xyr2l13fJX7OxyUPI6SmADAZHmIwkveHOLXY4WQF8kV0z3Iltbvs1P5UtiYad0VRsay41DCwMrZKaGJ027E0hzmDQEzxtcR9XeC8hs/tdbrfsHerPOyumrbhE+FrcN4LN58bt9rsgs+b1bgh3NXh16LycXijsW1MVwrnSQtEM0bKiJge+llfGWsna04yWOLXJa69HODa6sZTiEWXZx4YwDJs8DnYGmSd1eg2e8odDb7JYbVVWWGohoHVDqh5jy93Ec5zQzXGBnXIXp7X5Q9kRRy0G09dddo2vfHx55aYRGoaHU28Dg5IxG4ZdqVj1+2PkwinPINnKXO+95m83tOXtjj4RbnGBvh2RjBV4yU8GcfLBsrWScS52GoqDHE5kLZqaOUAGTeI+WPldBXjxtvaZdqK+sdTVVut9TZW22EUUEYkgIEeXAAtDsua45Jyu/wAqN/2IvVjzYqWOO7OuUk73x29sG9C50judjr1jXzZY0zcmI9+k/wAPsrPKdsVNdY7nctmKmsmiAg3Zo4n8dglhcJpHnUy4hXz7ykXq13/aiW4WeiFJSmKNmOCIi9zW4Ly0OOCV5tFbC6ZVXHTKIMq3Tsje+GfPJ5huvxrj1OHeF11lO6mqHRPOcatcOhwPQR3FdKzqR7KunFHM4Mkb9HlP9B7igwUXOWN8MjopWFkjTgg9S4IO2kjE1TDETpI9rT+Jwtzw4Bo2CJo6gWA/5lam2484U371n81uEE3IvsYP4bU3IvsYP4bVVcHBONEHHci+xg/htU3Iuzwfw2rkuUbS97WjpJwEGoukMUVSOENxrmB2OnBWIt1caB1S/fpXmZzWgboGCcdYWBNba+J5ZJSTB2cYx1hBiIs0Wq4kfQpvcr5puPY5vCgwUWyprVUcUMqaaRm9o0HTJK2V/wBnpLBUMZc6R4JibMG7+N4OaHAZ/HVBpqSjD4zU1EnBpQcb2Mlx9TR1lWord6M01Mzk9Oelo1Lu9x6101lTJVS8SQ6AYa0aBrR1ALq0z3IIiIgLfs+Zi/dM/pC0C9FTsfNTxPiYZBw2jIGdQMEIOVNPNTTtmp5Xxyt6HMOCEqZ5qmd01RK+SV3S55ySnJ5/sZPAU5PP9jJ4CsvFV4fDfRPDF721dlNXVlLHJFTVM0Mcvywx5Acu+0WeuuoqDRRB4p4992Tj8B6yeoLE5PP9jJ4CvU7KbU1uz9vNJT2aGbMwmMrw7eJGgWqq8R92NXRk8PLzi/8Amnw085iNfR4i6/Q25+0H8lqVvtqZxPPJM+EU5nndKIWfqg+rK0KzaaoiJmIEREQREQEREBXTKiume5BEREBERAREQEREF0yqpplNEEREQEREBERAV0yorogaZUV0yogIiICIiAiIgK6ZUV0z3IIiIgIiICIiDYIiIBJPSiIg6a/5EXsKxtMrJr/kRewrGzrnCCIuS4oCIiAiIgIiILplNMp1p1oIiIgIiICIiAuS4rkgmmVFevoUQEREBERAREQFdMqK51zhBEREBERAREQEREF0yornXOFUHFERAREQEREBXTKivX0IKuK5LigIiICIiAiIgumU61VOvoQRERAREQEREBclxXJBNMqK9fQogIiICIiAiIgK6ZUV684QRFyXFAREQEREBERBdMqqdfQqg4oiIM2OrjlibDXxmRrRiOVhw9g9XeO4q+bxLjklVBP3F/DcPaHYWCrlB6GWwVFpq4Zq0gxgtewxn5eNcd2FynYGbpacscMhYFNdKypuEYqpOOJXsaQ/1ZxpjGFmyPMhyQ0ADAA6AEG82KoaauuNSKmj5aIaOSZlPlw33tGg5uCt3FU1MVFPRx+T7EE5aZW5qNS3Ua5XiYJpqeUSwSyQyDocwlpH4heit9+q27MXSKW71XKnyQ8HM7t7AJ3sLVXTMzd5ecy+JVV441ibaXqi2vHSfr9HPay00VNaqa4tpH2mrmfg2+STfJb9o3OrR3FeZjcWPa9vSDkKzyyzyOlmkfJIelzzkn8SpAziSsjzjJAWdMTEau3L4VWHR4aqrz701vPfViXeqDAYYogzfYCTnP4BdLL1cmSGUTjiHGvDbpjJyNNDqsyvpYqxrnRARyRs0MkgAIHrJxgrrOz1ZzyySAxtIG/v4GehZN7V1dTNV1D6iofvyuxk4A6NOpcI2Oke2ONhe4nAA1JWwqLeLeGm4seS75LI3jJx6zrj3LqkuD2xmKkjFLERg7mrne1x1QdoEduBErt+oOhiZqGDvPr7lLhdJawHi5e4tazeec81oDQPwAwtciDkpplVTrzhBERbzZfZS+7TCY2akhnEL2RO4lVFFz5MhjW8Rw3nHGgCDu8n+ylXtjfXWmjl4cop5KjPDfKSGDJDWtBJK3Nz8le1EEEdRR08dbBIyR28ZGwOBjfK1zdyQhxcBE5xAzgLRWug2rt1Q+KgtVyZNXUskOBROeZoTpJu5acj1kLd2y/+UeCxU1mpKavfQ8lkFK3zWHlsR3hI6N5YSPnXAuCaciP1/L/trdoNg9q9n6Dl16tBoabiCLiyTMI3i+RmMAknWKRZW0fk+u1trLVTUErLqbpSuqacwxvYXMa4tzh4GhxkFdl9vnlH2noKOjugutfT55ZTN5Do4NYGcRu6wZaAFjbQSbb7UcjNfaK2drInzU7aa1iJhY47z5Q2NgByelyDEqNjdoaOekjuVAbdFU1DKds9QQ2MPccAuPUFv7x5Jdqqe4VNNa6Y3RtNCJJ3sBh3c72ABLul+RG4jczkLy1JadoqKt5TBZ7jHUUM0e9mkceDISCwOBBwT1A9K9nPtT5VaS11U0lNPb7cCyklb5qihiie/iOaA3cAY478hyk8Br6PyT7aS3emoam309K2aZkRnkroDGwl4ZgkPPPBPyPlLxVVEaeqlp3kExPcwkdZBwvptXd/K7ZLrLTSblVVxzvqZoaenpa4Qy74cXuEYeGPDm6ZXiItm9pK6veHWetErpzG900BiY2U67rnHAa7uU48CODSIsu722ttFwlt9wg4NVEGlzMh2N5ocNWkjoKxFQREQEREBXTKivXnCCIiICIiAiIgIiIL1qqdfQqg4oiICIiAiIgLkuK5IJplRXr6FEBERAREQEREBXTKiudc4QRERAREQEREGwX0LyZ22guVmNPXUsc8cl6p2Oz0lphmOMhfPV6PZLadljpKiknt3LYZpo524qXwvjkYHNBa5vdIgxb5YKi3U8FTGZKmnkpKeollEeGwumaXNYdT6nYWmXrbptTaau1TUEWz00PEjYxrjdJZA3hgiPmnQ7uXYXkkHTX/ACIvYVjZ52Vk1/yIvYVja570HNkMpAcGaFXgTfVSr+fd+H8l1IO3gTfVTgTfVXUiDk9rmHdeMFGBzyGMGSuyTPJof7yQZ4c33NPEEE4E31U4E31V1Ig7eBNvZ3P5K8CbOeGulASDkIC5xxyPB3GZC5VOlXNj67kk+jxe1yBwJvqpwJvqrqRB28Cb6q4yRyMA32YC4Lti+Ym9jf5oOpdvAmOvDSn1qYs/WautxJeSenKDs4E29nc/kggm+oupEHbwJvqrg8OYSx4wVxXdPnhw/u9fEUHWxrnndYMlc+BN9VWLPJ5vYP5rpQdvAm+qnAm+qupEHY+GUAuLNAuGedldlJ9IZ7V16570ERUZQZQRFddU1wgiK64TVBEVOUOUDPOyomu935VGd5BEVGU1QRFdcJrhBEV1whygiuedlDlNc96BlRUZz3oMoIiuqa4QRFdcJrhBEV10Q5QM6pnnZTXPemue9BEVGU1QRFdcJrhBEV1wmuiCLkocprlAzzsqqa570GUFja57w2Nhe5xwABkklbDzFe/2Ncf8K/8AJer8g0UcvlEp+JGH7kEjm56jhfpFeZnPiE5fE8EU3fU/Bf8ATtPxHAnGqxLa24PyH5ivf7GuP+Ff+SeYr3+xrj/hX/kv14i5d8Vfh/N6/wBisLzZ7fy/IfmK9/sa4/4V/wCSeYr3+xrj/hX/AJL9eIm+Kvw/mfYrC82e38vyH5ivf7GuP+Ff+SeYr5nPma4/4V/5L9eIm+Kvw/mfYrC82e38vyH5ivf7GuP+Ff8AknmK9/sa4/4V/wCS/XiJvir8P5n2KwvNnt/L8h+Yr3+xrj/hX/knmK9/sa4/4V/5L9eIm+Kvw/mfYrC82e38vyH5ivf7GuP+Ff8AknmK9/sa4/4V/wCS/XiJvir8P5n2KwvNnt/L8h+Yr3+xrj/hX/knmK9/sa4/4V/5L9eIm+Kvw/mfYrC82e38vyH5ivmc+Zrj/hX/AJJ5ivf7GuP+Ff8Akv14ib4q/D+Z9isLzZ7fy/IfmK9/sa4/4V/5LHrKCvogDW0NRTh2gMsJZn2ZC/Yi8d5ZYYpvJzdOJGH7jWvbnqcHDVZ4Xxaa64pmni583/pGjAwK8WnFmZpiZ4dPq/MSK64TXC9p8O77d/vCm/es/mtwtFBI6KWOUdLHBw/BbQ19Kdf0wz1YGiDJRY3L6X1yeBOX03rk8CDJVBIIIOCFi8vpvXJ4E5fS+uTwIOF8qpnPEWQI3MBIDAMnPXhYTK2sawNZVTgA5AEh0KtfUconLmtIaGho9gXRrhB2S1E8wAmmkkAJI3yTjPTjK6ldcJrhBEV1Q5QMpnnZQ53k1z3oIvV7Bbc3PY3jebaenk49RDM/ijORHvDd7s73SNQvKjKDKXH1qDy5XZlTSTyWKgkNPGBq46vAjAd7omrhT+Wy4xCAGwUMnCiLDmZ53xlpAOc5aOH15I6i1fKNV6WxXawUtBTx19r5RNGXbzuC0jJ6CcnLvVjTCcrJze1j8uV4/QCWx0L2siDHsDyGPIEbQSPZE1Y/+2m7sjoxDZqKOSn4OZeI8ufw3RuAJznH6PryV5o3/Z7ck4dn4DuG5jCIGO0LC3GpGDk53ulYVqu1npKd9PU2plQHSvO8YW53Du4AJJIwA7rUtfVbPZWry132gt0FILZRSGnEIZKc5O4yNh3us5ETV5/aDyg3C92NtrrKOB27LHM2YPdvAsfM4Zz++cF1yXzZgzvcLNuRkR7reTMON1xJzl2uni61kUV22QmqGMmouS4e5xmlpWuAaX53d1uc5Gg+qrMX4reW3rPLJe57zPdBRME08zJHB9S97W7vEwxuujf0iyKLy23elt7aYWO3PlxE10xLsuEYjAz15PCXgtp6611stMbVQckDGYeNzBJ9oJ3vadVpxlSOBrE3bLai8zX++VF1qIo4ZZwwFsecDdYG6Z9i1ioymqsRZERXXCa4QRFddEOUEVzzsocprnvQRFRnOiDKCIrrqmuEERXXCaoIiuqHPWgmdcorrnvTXKCIqMprqgiK64TXCCIrrhNUEVyhz1prnvQM87Kiuue9BlBEV11TXCCIrrhNcIIiuqHPWgiuedlDnOqmu935QEVGUGUERXVNcIIiuuE1QZ6Itts9Yqi8com5RBSUVIGmpq6gkRwh2jRoCS49QAyUGpReou+x76ajqam3XOG48lYH1UPAlgmhYeh+5I0FzO8LA2svVNe6yCemtNPbWxQtjLIdQ4jrOgUmZu2U00zRMzOsW06/9NBX/Ii9hWNrnvWTX/Ii9hWNjnYVa3ZV/SHfgt7sfSbNyU1zuG0c1UY6OOPgUdNM2KWoe5+6cOcDo0alaKr+kO/Bb3Y+32C501zpbvd4LVW7kbqCoqOJwch/Pa7ca46t6EHPYil2WuNbNb79JW0jp88mq2TsbHTkNJ/SBzedk7o0IXml6TYq27PVNZNVbR3qnpKGmBzBiUzVOWndEe6w9e7nOF5tB3SZ5NF7XJBnhTfc/wD2CSfRYva5SD5ub7n/AOwQdS+i2DYm2i3wG50V8utxnoTcX0lsMcYpKbUte97wd55AyGBfOl9M2a26oRb4OVXq+7P3OGg83z1NujEzK2AAtYHML2bkjQcB6DyO2lhhslZSyUFY6utlfTipo6h8fDc5mS1zXNycPa5rmlaFey8pN0sN2pLHJs9UTw0lHSupBb6kZmgIeXGVzxo/iGRzu4rxqDuq88rm++5ST6PF7XK1etVN99ykn0eL2uQZezdoqr9faKzUe4J6yZsbC84aM9ZPqC9tSbK7H3Kpis9BLtHBNUPENLeKmmaKOolOjQWYyxjjoHbxXi9mLvUWDaChvNK1j5qOZsoa/wCS7HS09xC+h2TavYm3XSiuEl02uqLdTztmhsEhBgp3NOW/pDJh7WnUDhjKD5dUwS01TLTTsLJYXuZI09TgcEKxfMzewfzWXtIIfP8AXGC5C5Rumc8VQjczjbxzvbpAIKxIvmZvYP5oFNnlMX32rrPyiuym0qovvtXWflFB7HyabAXLbQXOqp3cGhtkQfUSjdLy92RHG1pI1cR0nQLU7SbI7R7OwR1F5tU9LBK7cZNlr2F2M43mkjKxdn71cbLVyy2+q4AqIXU9QCwSMkido5rmEEOC9BV1Wz9j2Sutntl6fe6i6ugyRSvhipxG4u3ufq55zgaaBB41d0+eDD+7P9RXSu2f5mD92f6igsWeTzewfzXXA5rJWSPjEjWuBLDnDgOo4XZD9Hm9g/mulB+hqfyOWXyi2+g2i2U49iqrvT77LMY9+KBzXbr5zJnLYTjTTJXyrym+TbazyeXBtNtHb+HDKSKeqiO/DN7HL6r/APSt5YrJsNY75Z9pzw4Gs5XSSsZl8jxoYF8k8qO21ft1tbX3qp4lPTzzmWGk4znxwaAaA9Zxqg8zSfSo/auvXPeuyk+lR+1deOdhBUXFEHJTXCiILrhVcUQclCoiC4Oe9NcpjnYTCAMqriiC64TXCiIOSLiiDkprnvUVxzsIAzvIExzsKIOSmuFEQXXCq4og5KFREF1ymue9Mc7CY52EAZVXFEHJTXCiIOSLiiDkprlRckE1z3oMpjnYUQfQPIF/3hQ/+2lX6OX5x8gX/eJD/wC2lX6OXzfxb/n+j9O/0h/6E/8A1P6C9LsvbLbWWqaatpJppuM5kJbNuA4ic/GMHJy1eaXt4KhlNTW+O3iyTRUrWyxS1FUWP4pALnFu8Marly8RNV5ev8TxKqcOKaNJnne3D1983iF6BlioI7JSXCrudTG+qY5zIoqLiAbpxq7fCwtqBSi9SvpJIi2UNe8RHLGSOGXNaesArb0+0lKNnqS2Gpu1K6CN7XCmc0Ml3jnXJTDpoiaoq+iZnFx68PDrwYmLzrwva09Ynnbk0r7HdWxGY0buHwmS72+3Ba84bg51JPUNV2VOzt6p5YIpaB/EnfwmBrmuy/6pwTg9xW3h2opIbRQ26OlnLaCWKpheTq6ZrsuDh9Q50WZUbaUwq4pIY6qSF1Q6aaJ0cUeA5pbhpa3LnAO0JWyMPA/F79/u5qsz8QidMOOf8c+f8erzNbYbtSGTj0m6GQmdxD2ubuBwaSCCQcErKj2XuptE9yeyONkLGShpkbvPY8ZBAysmkudhpJJqWKK5Po6ikdBK9z274JeHAtb0DGFmVG1Nukilp2UtU2IU9M2DO6Tvw9G93FIw8DnPvX0+TKvMZ2bRTRzjW3K8crz6vP3KyXS3U7KitpDDE5wbnIOHYzh2CcHHUUZZLo6MyNpC5opOVkhwxws43ludqdpoLpQTQ03KWGpnE0rHwxMa3GdMtaHO1PSV2WPa6Kgs9JQy0r5DHKWTuyMPpjkmP25Kx2eDNcx4tGUZjPbCK9nHivw9PejUQbM3yaR0bKB280NJzI0fKGWgZOriOrpXK37OXOqNNJJCYKeepbT8Z5bo4v3TzSQSQepbR20tvrnzi5w1YjFw5bBwHDOAA0Ruz3Buqx6zaSKqudtrHU72clrpKqRoI1DpQ/DVl4MCNb+9GMY2fq08MR9PT563nt6pa9ka6su7KSRwhp3PkxO4tBc1hwXBhcCVwuGy9S2WmZbS+qM7ZX4O63cYx5blzt4tx3rPqNrKOpvcF4mpZhVRslheG43XRkEMOOojOq6aLaOiFpgtdVBPwDRuppnx43gTJvhzcqxTgWtf69mrafEbxXMdLxb/AOr89eXC1/RqZNnbyyUROoXhxnbTgbzdZHDLR09BHQehY9Zba6ji4tTA6OPjOgyXD5bflD8F6eDbGnppZo4KWUwR0TKekL3DebIwEMkd4nLU7X31l7mpDFA6BkUXPBxzpXHL3/iteJRgxRM01a+/f1h0ZfHztWLFOJhxFPX6fPq0a8l5YP8Au4vH7of1BetXkvLB/wB3F4/dD+oLDL/8tPzh0/E//Txf/mr+z8yUHD5bBxscLis389GM65X2i6O8mF9uN6pKcUMEMFZu28BkFEJ91tSQxsrcjhEiEb7l8RRfYPxZ9hr9mvI/Ha7jVQ7Rzmop45jBTcpB40keeYDu6hxkjw7r3XLz72bPf7HiakWkXYTxGnMJaahw33CRrv1w7Hr5mN3HOXz5EHpJ5dhuA8RW/aQTbh3C+uhLd7GmQIuhfSdloPJ1PsvZxfpbHQAU7mVDhuSzvkMM2ZNCJGvDt3mPBbnd3Svmnk2s9LftuLXZ66OaSnqZCHsidh7sNLsA6r3lZ5JGXCCOut5q7O4UjZ6231LOM+jJjqX89/NwCIG4yNOIiRF5s2J2R8ntVY31xrqcU9G80z54rjGBCHOqnMfncBmkIjjw3pXkmVOy9N5LZWRsoJ75NRxsyQzixk1MpfjTOd0R69OFi+VfYN+wdXQ0XnnziKxj3n9AYQC07uRkkOaepy8OpHNlwfdbhR+SK60E4ppqCkqxNTxcCOcRCYspZHbzZTkMZJKY2uPUWrX0+zHkhfWtpJr6+EF2++YXBrmsIkjbwPk4I1dz/wDhyvjSLKNJLvQeUGhstu2qqaTZ+pdUW9jWYcZGyYeWAvaHNJBAK0GuFEWMRZJclDlRFRdcprnvTCY52EFRcUQclNcKIguuFVxRByU1URBcHPegTHOwogoyquKIOSmuFEQckXFEFOUwc96iuOdhA1QZVXFByRcUQXXCq4og5KHKiILrnvTXKY52EwgqLiiDkprhREHJFxRBTlNcqK4QNcoExzsKIOSLiiC64TXCiIOShURBTneTBzjrUVxzsIAVXFEHJTXCiILrhVcUQbBey2aZW3HYuagsu+bpQXFlw4Eesk0YZuhzB+sYyNR/xLxq5RSSQytlikfHI05a5hwQR1ghB9OpK26yVcN9u8M0NrtFtnp3VFQZC6qlmjcDHmQAucXyYwNAF8vWXcbncbk9slyr6qtc0YaZpnSEDuysRB01/wAiL2FY2NcZWTX/ACIvYVjaZQdlX8878F1LtbO8YB3CB1lgcf8ANOO/1R/wW/kg6kXdx3+qP+G38k47/VH/AA2/kgkn0eL2uVg+bm+5/wDsF1yPc/Vx/DGAjHFhD2HVBxRdvHf6o/4LfyV47/VH/Db+SDpRd3Hfnoj/AILfyQVEmdOGO8RtBQSr1q5vvuST6PF7XLgrHK9jSARjpwQHfzQcEXbx3+qP+C38k47/AFR/wW/kg6l2xfMzewfzV47/AFR/w2/kuEkr3gA4x04ADf5IOVNpVRffaus/KKq7DPJnXhnvMbSUHSi7uO/PRH/Bb+SnHf6o/wCC38kHUu2f5mD92f6inHf6o/4LfyXB7i8l7zqg7IvmJvYP5rpXKN7mHLTquzjv9Uf8Nv5IOlF28d/qj/gt/JOO/wBUf8Fv5IFJ9Kj9q6+vGV2Gd+oG4MjqYAf8l16ZQRERAREQEREBERBevGVVNMqoOKIiAiIgIiICvX0qK6ZQVcVyXFAREQEREBERByU600ymmUEREQEREBERAXJcVyQTr6VFdMqIPoHkC/7xIf8A20q/Ry/HVrr6u2V8VbQVD6eohOWPb0gr1f8AtS27/b3/AEcHwLyc9kMTHxPHTMfV9f8AAf8AUOX+H5acHFpmZvfS36zD9NIvzL/tS27/AG9/0cHwJ/tT27/b3/RwfAuPdGN1j8/2e39ssj+CrtH+T9NIvzL/ALUtu/29/wBHB8Cf7U9u/wBvf9HB8Cboxusfn+x9ssj+CrtH+T9NIvzL/tT27/b3/RwfAn+1Lbv9vf8ARwfAm6MbrH5/sfbLI/gq7R/k/TSL8y/7Utu/29/0cHwJ/tS27/b3/RwfAm6MbrH5/sfbLI/gq7R/k/TSL8y/7U9u/wBvf9HB8Cf7U9u/29/0cHwJujG6x+f7H2yyP4Ku0f5P00i/Mv8AtT27/b3/AEcHwJ/tT27/AG5/0cHwJujG6x+f7H2yyP4Ku0f5P00i/Mv+1Pbv9vf9HB8CHypbd/t7/pIPgTdGN1j8/wBj7ZZH8FXaP8n6aRfmX/alt3n/AH9/0kHwJ/tS27/b3/RwfAm6MbrH5/sfbLI/gq7R/k/TS8j5YSB5OLvn7Nv9YXxP/ant3+3v+jg+BazaHbXafaCi5Hdrq+enDg7cEbIwSPXugZWzB+F4tGJFUzGk+v7ObO/6symNl68Oiiq9UTGsRzj5vPIiL3n58IiICvWorplBSS4jL840yVxV0yogIiICIiAiIg5KdeMqqaZQRERAREQEREBERBevGVFdMqICIiAiIgIiICvXjKiumUEREQEREBERAREQXr6VVNMqoOKIiAiIgIiIC5LirplA6+lRXTKiAiIgIiICIiArjXGVFdMoIiIgIiICIiDYIi9l5N7LarpFXVNfQzV81NPStZTiq5Owtlk4eXP3HdZaMIPGovr219kttbaKyvuFJHx6ahmmZX0TTA0ltRuNY6nMYJw47u/kaL5Cg4VcUskcRjje8a9Ayujk0+fo82PuFdlf8iL2FYqDu5NP9hL4CnJqjs83gK6UQd3Jqjs83gKcmqOzzeArpRB3cmqOzzeApyao7PN4CulEHdyao7PN4CnJqjs83gK6UQd3Jp8/R5vAU5NPn6PN4CulEHdyao7PN4CnJqjs83gK6UQd3Jqjs83gKcmqOzzeArpRB3cmqOzzeApyao7PN4CulEHdyao7PN4CnJp/sJfAV0og7uTT5+jzY+4U5NUdnm8BXSiDu5NUdnm8BTk1R2ebwFdKIO7k1R2ebwFOTVHZ5vAV0og7uTVHZ5vAU5NUdnm8BXSiDu5NP9hL4CnJp8/R5sfcK6UQd3Jqjs83gKcmqOzzeArpRB3cmqOzzeApyao7PN4CulEHdyao7PN4CnJqjs83gK6UQd3Jqjs83gKcmqOzzeArpRB3cmnz9Hmx9wpyao7PN4CulEHdyao7PN4CnJqjs83gK6UQd3Jqjs83gKcmqOzzeArpRB3cmqOzzeApyao7PN4CulEHdyao7PN4CnJp8/R5sfcK6UQd3Jp/sJfAU5NUdnm8BXSiDu5NUdnm8BTk1R2ebwFdKIO7k1R2ebwFOTVHZ5vAV0og7uTVHZ5vAU5NUdnm8BXSiDu5NPn6PN4CnJp8/R5sfcK6UQd3Jqjs83gKcmqOzzeArpRB3cmqOzzeApyao7PN4CulEHdyao7PN4CnJqjs83gK6UQd3Jqjs83gKcmn+wl8BXSiDu5NPn6PNj7hTk1R2ebwFdKIO7k1R2ebwFOTVHZ5vAV0og7uTVHZ5vAU5NUdnm8BXSiDu5NUdnm8BTk1R2ebwFdKIO7k1R2ebwFOTT5+jzY+4V0og7uTVHZ5vAU5NUdnm8BXSiDu5NUdnm8BTk1R2ebwFdKIO7k1R2ebwFOTVHZ5vAV0og7uTVHZ5vAUNNUdnm8BXSiDu5NPn6PNj7hTk0/2EvgK6UQd3Jqjs83gKcmqOzzeArpRB3cmqOzzeApyao7PN4CulEHdyao7PN4CnJqjs83gK6UQd3Jqjs83gKcmnz9Hm8BXSiDu5NPn6PN4CnJqjs83gK6UQd3Jqjs83gKcmqOzzeArpRB3cmqOzzeApyao7PN4CulEHdyao7PN4CnJqjs83gK6UQd3Jp/sJfAU5NPn6PNj7hXSiDu5NUdnm8BTk1R2ebwFdKIO7k1R2ebwFOTVHZ5vAV0og7uTVHZ5vAU5NUdnm8BXSiDu5NUdnm8BTk0/2EvgK6UQd3Jp8/R5sfcKcmqOzzeArpRB3cmqOzzeApyao7PN4CulEHdyao7PN4CnJqjs83gK6UQd3Jqjs83gKcmqOzzeArpRB3cmqOzzeApyafP0ebH3CulEHdyao7PN4CnJqjs83gK6UQd3Jqjs83gKcmqOzzeArpRB3cmqOzzeApyao7PN4CulEHdyao7PN4CnJqjs83gK6UQd3Jp8/R5sfcKcmn+wl8BXSiDu5NUdnm8BTk1R2ebwFdKIO7k1R2ebwFOTVHZ5vAV0og7uTVHZ5vAU5NUdnm8BXSiDuNNUdnm8BTk0+fo83gK6UQd3Jp8/R5vAU5NUdnm8BXSiDu5NUdnm8BTk1R2ebwFdKIO7k1R2ebwFOTVHZ5vAV0og7uTVHZ5vAU5NUdnm8BXSiDu5NUdnm8BTk0+fo82PuFdKIO7k1R2ebwFOTVHZ5vAV0og7uTVHZ5vAU5NUdnm8BXSiDu5NUdnm8BTk1R2ebwFdKIP/2Q==";
const NIFTY_IMG = "data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAOJBQADASIAAhEBAxEB/8QAHAABAAEFAQEAAAAAAAAAAAAAAAQCAwUGBwEI/8QAZBAAAQQBAgEGBgsLCQYDBgENAgABAwQFBhESBxMUITFUQVFSkZKTFSIkMlNhcXKhsdEWIzM0QnOBorLS4Qg1VWJkgpSjwUNWY5XT8BdFgyVEdISzwvE21CYnN8NGdYWktOLj/8QAHAEBAQEBAQEBAQEAAAAAAAAAAAECAwQFBgcI/8QAQxEAAgIBAgEJBwEGBAQHAQEAAAECEQMEITEFEhNBUWFxgZEGFCKhscHRMhUzQlLh8CNygqIWNZLxByRDU2Ky0sLi/9oADAMBAAIRAxEAPwD4yREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAd8s8nGLw+k9L5XF6AyuvK+QodNyeQpTzPHA7vs8ItDu0bh4XNY/T2mtCW+T7XusaencjkI8RcpxY+pdsmBgMx8JsfNO2+yxWmc3ojEHjL2G1jrLTcrtGWUp1YuIZTDyDCQN2f+sPhWz5zluqW8NyhTYkchhMxqC/SnoHTLg4RhJuNzIXZ2ImQHtrkgwmd1nobGYo5MIWoMcV3J0Tk506AAzkRs5eUw9TOtLu5bkobKX6A6SyMWOZjjrZCDIGdriHqGRwPaN2Lwitwj5YdPtn8ByjDj5otbUyeDM1wiZq2UhIOAjc9+IJHZadfj5Izyt7JxX9RS1ZBOStixpRxuJl2AU/OP7QfGwIDeORTkq0pqDk+G5qYp483qCaxW05tM4i8kUblu7N27ksDyXcnFfLaI1JmpMBc1Ln8ZbCrDga8hhKLP76UgD25M3Zsyl6p5aJMbkdLUtASSV8FpypBHCFqlDzskzPxSnu7E48bqPq3UXJfmdX5zUeIyWqdM5G5ZG7UtV67E0ZGLc6DiMgu3t+J2JiQGp8pdDF1Z6NChpDNaazUUZBlMfc4yFi6nAo+P27bs5bsS2P8Aky6L07rHX1/E6zrW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LSOzMINws4irFjlP0cWn79TI2cpqavJhmpUKGVxsLzUpfGNvdzcRQF/lO5JKOTzOkaGlLunMVfyWnoJQx0ssozXJ2EiM/axkAuXg5wg32WOfQGGtfyesNlrNnCYDLtnbNW1evlLxSMLbNEzRRmRbK9PyqaYPlg0Dq1o8h7H4DF16l1uBucc42k34G3+NlCyGtdCah5NKelsrksvjpq2o7WUeSKgM7SRSk7sP4QdiQGuWeR7U9HIZqDM2sZiaeFADt5K1JI9XaT8FwPGBmbn4GYVHyXJjksbmqVDJZ7T9WnkKL36WUksyPUswt5DjG5ufg4ODf4lvmpuVvTOr6uqNO5evkMbh8gNT2OtRA00oFWDgDnB3HdiFS8ZyvaOxdnE4mpVutQw2DmoY7LSVwOxBak9s9kY3dAaDHyP6hnu6bioZPD5GpqK0VWjdiOYImlDtAxkjCQfQQeSXLSaml05S1Dpy7kKoyHkWgnleLHgDbmcspRMDs3/Dc3W/1OV3S1KLQMFnM6kzkun81JfvXLsW5yAY7bAxSEtP0Xyg4PGa81pbyIWhw2p4LVZ5IgZ5YRkPjA+HfzsgJGudJafwv8n7TuYoz4vKZGxnrFebJ0WmYZIxDdo350Afq+RcdXVdb6p0gXItgtCYG5k71uhlpr09izUGACEw22FmM1ypAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREARE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vgegSczX74HoElAiKVkvxp/kH6l7zNfvYegSv34YHsvvbBuofyC8StbEvcxqKXzNfvgegSczX74HoEpRSIil8zX74HoEnM1++B6BJQIiKXzNfvgegSczX74HoElAiIpfM1++B6BJzNfvgegSUCIil8zX74HoEnM1++B6BJQIiKXzNfvgegSczX74HoElAiIpfM1++B6BJzNfvgegSUCIil8zX74HoEnM1++B6BJQIil3vfRfmRTma/ew9AleuRQOUW9sG+9D+QSqWxL3Mcil8zX74HoEnM1++B6BKUUiIpfM1++B6BJzNfvgegSUCIil8zX74HoEnM1++B6BJQIiKXzNfvgegSczX74HoElAiIpfM1++B6BJzNfvgegSUCIil8zX74HoEnM1++B6BJQIiKXzNfvgegSczX74HoElAiIpfM1++B6BJzNfvgegSUCIpNv8XrfMf61VzNfvgegSv2IYHgr72wb2j/kF41UiWY1FL5mv3wPQJOZr98D0CUopERS+Zr98D0CTma/fA9AkoERFL5mv3wPQJOZr98D0CSgREUvma/fA9Ak5mv3wPQJKBERS+Zr98D0CTma/fA9AkoERFL5mv3wPQJOZr98D0CSgREUvma/fA9Ak5mv3wPQJKBERS+Zr98D0CTma/fA9AkoERSp/xKv8pfWveZr98D0CV+WGDosPusO0uvhJVIjZjUUvma/fA9Ak5mv3wPQJSikRFL5mv3wPQJOZr98D0CSgREUvma/fA9Ak5mv3wPQJKBERS+Zr98D0CTma/fA9AkoERFL5mv3wPQJOZr98D0CSgREUvma/fA9Ak5mv3wPQJKBERS+Zr98D0CTma/fA9AkoERFL5mv3wPQJOZr98D0CSgRFL/8ALW/PP9TJzNfvgegSkc1B7Hs3Sg251+vgLxMqkRsxiKXzNfvYegSczX74HoEpRSIil8zX74HoEnM1++B6BJQIiKXzNfvgegSczX74HoElAiIpfM1++B6BJzNfvYegSUCIil8zX74HoEnM1+9h6BJQIiKXzNfvYegSczX74HoElAiKpSeZru/42HoEt2w/JTq7L6SDUuNptapGR7CG/OOIdpMPhZajGUtoqzE8kYK5OjQd903W+cl2jaWpNSS18veeli6UJTX5+FxeIW9q3a3a7ur2qOSnVGG9lrbUZ5sXjjfjuMHtSB24mNvG23a7LSwyatLYy9RjUua3v+TTtO4m9nMvVxWNrnYt2ZGjjjHtJ13rM620zySXgwGksFVyNqnMx3rNndzjkIdnECWn8jmFtYKC/wAot1wr42hQshSmkfhaW0QFGAAz9b++XNiaOSvKclsSIjFychJ3d+tbhJ4o2uL+hxnCOebTdxXV2t/g6ZykcsEuSqWtP6RqNiNPTbO4PGwTyFxcRETi77O7rm3s/mnx8uNfJ23pzG8kkDyu4mT9ru3hd1C5iv3qP0STma3hth6BLE8kpu2ztjw48apItjPMDu4TGLuPC+xO3V4lUdmeSvHXOaQoY3dwBzdxF37dm8G6q5iv3sPQJOYr97D0CWNzpsREUrmK3e4/QJOYrd7j9AlKKRUUrmK3e4/QJOYrd7j9AkoEVFfmjiBmeOcZH37GF2+tWFAVP4V6zN4O1eKZj7HQ7kNkoo5WiMT4DbcS2ffZ28To7StBtpNpWRtn/wC//wAU2f8A7/8AxW9Nyht/uxhf8Oyf+Ibf7sYX/DsvH0+o/wDa/wByPn+8ar/2f9yNHdt//wAf4q5UrTW7UVWvGUs0xsAALbuRO+zMy3b/AMQmZurTGFb/AOXb7FhRzb39W1ckxQYXhnAxlrxO419nb27C3bt2rrhyZZupwpdtpnfBmzzlWTHzV22n9CVqTk71Pp6nZtZSvj42qSBHZihydaeauR+9Y4ozIw/Sy1p6F1pxgKpYaUm3EObfidviZfQ9DWnJ1WzkOotYXNPalzIZmvPHbw+OsQHJEPUZzjKAC/g9qykZDX2j8jnIpL+tasZV4sg9W3SkyHG7ydccc05x84AO/gjYtl3PSfOEdC6cpxDUsEYe/EY3dx+VlR0O1zDz9Gn5pn2c+B+Hf5V9U5PlM0Jb1hYmh1hQq42xFj3vWK4X4LUssIOxFHKMe5/JIws6xmO5StDwYTHG2p5RoVsNYo2cHNUN5LVk5nILBcIvFu/v3Li3QHzXJRuxiJSVLAsT7C5Ru27+JlsOjdEZnVFy9SrPFUlpY+bIH0viBiii2cmHYX3LrXcdR8p+mM/qDUsF/WNpsVPlcRNipAhkd4I4mdrBxiQfe3ZZHK8pOgmrVBHVEd2aLA5qic+1yc3eco3rgRyxibu+z/EyA+UUREAREQBERAEREBmMFqTUGBeR8Hncninm25x6VuSHj28rgdt1JDV2qo7V6yGpM0M99mG3KN+RjsMzbM0j77ns3jWvIgMvDn85X6LzGZyEb1AKOs4WTbmQP34hs/tWfwsyxTk7u7u+7uqUQBERAEREAREQBERAEREAREQBERAEREBXH+EH5WVy9+OS/OdW4/wg/KyuXvxyX5zqrgQsIiKFCIiAIiIAiIgCIiAIiIAiIgCIiAKVkvxp/kH6lFZSsl+NP8g/Ur1AioiKAIiIAiIgCIiAIiIAiIgCIiAIiIAylXvfRfmRUVlKve+i/MitdQIqIiyAiIgCIiAIiIAiIgCIiAIiIAiIgCk2/wAXrfMf61GUm3+L1vmP9aqBGREUAREQBERAEREAREQBERAEREAREQBSZ/xKv8pfWoykz/iVf5S+tVAjIiKAIiIAiIgCIiAIiIAiIgCIiAqbwLI1MXft427kK1WaWrTYXsSiPtY+J+Ed3+N1sXJroDM60vC9WHmsZDIzXLshMMUI9r7u/h2XXW1LoLk3jo6VxF6PUGCyNmabMyvGMxMLAwADMu+PDzlcnSPNl1HNfNgrfYfN6lf+XD+df6mXZs9pXE8pOJx+T5N8AFA4LhUbVdn2fhduIJTTkrw2F0ZE+d1tR52w+X9i6taYWKNnfYZZHZ/JZVYHzqvbt6iPVR5t1uurrOHv8qN8q6tyvcjme0WMmViZruKIydziF94Bcn4WNRuRbQ9DUdq7b1I1iph46zsFjhcQeYyYA2fw7OSz0M1PmNbm/ecbx9InaOZb+FNt3Wb1fpzIaYz1nE5KCSOaGQgZyB2YxZ9mIfGzrCbrk04umdoyUkmuB7vt4XRuvw/Sth0Lpe9q3UMOKpe1Z/bzzF1BDE3vzJ/Ey7ZR5KOTahkCv5PWFSxg7sLxUGKfaR5n2ZydxXXHhlkVrgccupx4nzZce5WfOf5HhW16H0JqDWEtmPEwxg8ELSk9g+bEmd9hYXftd1teE5L7eM1fePVlaeLTuGkkltWjjcRshG/UAfGax+uuVrUGpKAYesFfFYaBw6PUqjw82we89sqsahvk9CSzSyOsVPtfUv6mj5vFX8JlJsZlK0lW3AXDJGfaLqHu27N2sz9u/Uu2Q8q+isrjcZX1not8zfr1wis5AjZpZHHs622fZZWTSPI3qjUNvF4TNTQZXIx85QjBuGtAbju0fxutdCpfoafyZj3qUP3kWu9bo+fN38b9qk0qlm9ONenDJPKe+wRi5E+zbv1MukZrkompcpkOko8gJ1OjDanvu3tI4hDikP5GWWu6zwPJvSr0uTSzUyNuy5S2MnYrbygO/tYlhYavnOkjb1Ckksatvfu8y1ovkcuQzU8rra/QwFHnQlaC7OInPE3tjbzLC6g5WNTPrKTL4O8+Mrw8UFOCuDDGEDG7iLj2LS89mcrn8nNkstbnuWZHdzOQnLbd99m8TeJliy7W2+pV5VFVDb6iOByfOytN9lbI6PrjlezuqcCWLs0MdUKdg6bZrx8Mtpw7ON1Vyc8pNzH5qvX1XkclkdPNXlrTVHlcvvZjtsua7+Nl5tv1LPTTu29zXu+NRcUqRuXKZrB9T5EYaMT0sJU9pQpC+wxA3hdvKdatH/N8vz2UZ/EpMf8AN0vzxWXJybbOkYKCSXAiIiLBoIiIAiIgCIiAIiIAiKREUQzCUwPJExM5AxcLk3hZn69lVuCx5086znTtOf0Jb/x7f9NOnac/oS3/AI9v+muvRx/mRaXaYR16IuT7Czu7rNdM05/Qlv8Ax/8A/wA1Vg7YRarx9rFww1iCzGcQW5GKMSZ29+Ts3tVJwSVpp+oaS6zIVOTfXti1SgHR+ciK9I0dUrFI4Y5Sdt2ZjNhH6Vq9qvLUsy15hcJYjIDF/ATPs7L6r0/U0tktaFqHWBY/C27mchazR9nIbuPyYcJ8RGHYIj75nkUfTV3QleDCUpcfomWE8XlrFkrFKoRvPGZvXYjJuJviZciHyqszkdO57H4mtl72EydXHWmZ69uaoYQys7btwG7MJfoW8ctZafmn0hk8fBixmuYOvLlI8fHFCDz/AJe4RMwgbrpPKvlsT7A8oeRkytC5j8/Hi2wkIWQkL2kTdkbO7x8CA+ZUREAREQBERAEREAREQBFvHI5pnBau15Q09nL2RqQ3HIY3pwgZEbC5bORu3A3V27Etj5NdFaP1Hpy70qa3e1M2RatRxMOZr48p4tt3NnlhPiJAckRdv1jyU1IOTjTupqMAYGFqFiTLWL85nvOM7xxxNws+8j8PYICuLtVsO27Qn6KtAsIr/RLPwJ+ZOiWfgT8yUyWWEV/oln4E/MnRLPwJ+ZKYssIr/RLPwJ+ZOiWfgT8yUxZYRX+iWfgT8ydEs/An5kpiywiv9Es/An5k6JZ+BPzJTFlhFf6JZ+BPzJ0Sz8CfmSmLLCK/0Sz8CfmToln4E/MlMWWEV/oln4E/MnRLPwJ+ZKYstx/hB+VlcvfjkvznVUdWxxt95Ptb8lXLtWw9qV2hP3zq06FqyEiv9EsfAn5k6JY+BPzKUxZYRX+iWPgT8ydEsfAn5kpiywiv9EsfAn5k6JY+BPzJTFlhFf6JY+BPzJ0Sx8CfmSmLLCK/0Sx8CfmTolj4E/MlMWWEV/olj4E/MnRLHwJ+ZKYssIr/AESx8CfmTolj4E/MlMWWEV/olj4E/MnRLHwJ+ZKYssKXkvxp/mt9SoarZ+BPzKRfq2HsE7Qn2D9StOhe5j0V/olj4E/MnRLHwJ+ZSmLLCK/0Sx8CfmTolj4E/MlMWWEV/olj4E/MnRLHwJ+ZKYssIr/RLHwJ+ZOiWPgT8yUxZYRX+iWPgT8ydEsfAn5kpiywiv8ARLHwJ+ZOiWPgT8yUxZYRX+iWPgT8ydEsfAn5kpiywiv9EsfAn5k6JY+BPzJTFlhS73bF+ZFUNVs/An5lIuVbDlFtCf4IVadC9zHor/RLHwJ+ZOiWPgT8ylMWWEV/olj4E/MnRLHwJ+ZKYssIr/RLHwJ+ZOiWPgT8yUxZYRX+iWPgT8ydEsfAn5kpiywiv9EsfAn5k6JY+BPzJTFlhFf6JY+BPzJ0Sx8CfmSmLLCK/wBEsfAn5k6JY+BPzJTFlhFf6JY+BPzJ0Sx8CfmSmLLCk2/xet8x/rVPRbPwJ+ZSbNWw8EG0J9QP9aqTKY9Ff6JY+BPzJ0Sx8CfmUpkssIr/AESx8CfmTolj4E/MlMWWEV/olj4E/MnRLHwJ+ZKYssIr/RLHwJ+ZOiWPgT8yUxZYRX+iWPgT8ydEsfAn5kpiywiv9EsfAn5k6JY+BPzJTFlhFf6JY+BPzJ0Sx8CfmSmLLCK/0Sx8CfmTolj4E/MlMWWFKn/Eq/yl9ao6LZ+BPzKTLWsPThbmT3ZyVSYbMeiv9EsfAn5k6JY+BPzKUxZYRX+iWPgT8ydEsfAn5kpiywiv9EsfAn5k6JY+BPzJTFlhFf6JY+BPzJ0Sx8CfmSmLLPYvVe6LZd/wJ+ZdC0tyRaq1FpT2dowRlzkohWrk7NJMzlwEbeIRdajjlJ0lZmeWONXJ0c3+TdPl3Wxam0dqPTmYLF5XFzxWhFi4AHiZ2fws4r3SOkc7qfN1sXjqcryTlw8RC7ALdruT+Bk5krqtx0sK51qjX9n633bt61nNFaZvap1DXxNIXHnPbySu3tYo298b/Ey6he1dojSd8cHiuT3FZ2LHm0Z5Kz+FskPUZM23mUDUfK3Yv6fs4rEaIxGFksQPXKzXHeQAInIxHqbZiXZYoL9T8kjzvNlkvhjV9ba9SDyoZDD4LTeO0JpTNeyVWCWS5fuRNwhNOftWFmbwCIrlr/KpD17G7+5z2+RU9FsfAn5lynJyd0d8cFBcb7+03Hk15SdRaCC4GDKqzXHF5eeh4/es7Nt51keWTlBPXcmPmhrnVr1QZnBxFnKZxbnD9r43XPei2N/wJ+ZSHqz+x4tzJ786/wBTLSyT5vNvYy8GPn9JW/adt5F+UrK6h1Bb0trDKRWMdmq5QSzWNmMHYOAWDsFndYfl8yM2mp8bydYe7aHG4asLTtx7DPMb85xu36VyiALcEwzQhIBgTGLt4HbrZ1O1HkczqDLz5fKlJZu2HF5ZHFm4thZm6m+Jlt55PHT49vccVpIrLz1XN7O/tOt0clqLlo0NkMNaCtaz2MsQS0XCNoneF9wPd/MtW5X+TqpouvRt47JneglkOraExZihsALOQfSsNyb6wz+g8vPk8RWhOaaAq5DYByHhd2fwOy3vkx1liKukdRy6rrxZK7DdHJ4ytZFyaeyYmBfKzLacMkalx7fA5yjkwSbgvhvgu8x1SlHofkcydzIvYqZ/UwDXpwlHs41gkApH+JiZcmYiZh2J+3dls2udTag1jmnyOXeQ+HcIIWF2jhDyAZ+xlrnRZ32+8n5lxyNNpR4I9WKDSblxe7/B0XX/ACx6l1lpeDT2QhqRVY3B5CiEuOVwbtJ3dcy3V/o1j4E/MnRbPwJ+ZYnKU3bdm8eOGNVFUiOqgIhJiF3Z27HZXeiWPgT8ydEsfAn5lmma2OhPyt6iHQBaP6NQeB6/Rulc2XPtFxbuPFv2Ouc9r9auvVsfAn5l50Sx8CfmW5SlKrd0ZhjjC+aqssIr/RLPwJ+ZOiWfgT8yxTNWWEV/oln4E/MnRLPwJ+ZKYssKVF/N0vz2VPQ7PwJ+ZSY6s/QJW5k9+MVUmG0Y5Ff6JZ+BPzJ0Sz8CfmUpiywiv9Es/An5k6JZ+BPzJTFlhFf6JZ+BPzJ0Sz8CfmSmLLCK/wBEs/An5k6JZ+BPzJTFlhFdkhlj6zAhb41aUKERS6wVzsg1qQ4oXJucKMGMhHwuwu4s7/FuyAjIti6For+ns/8A8ni//OU6For+ns//AMni/wDzlTnd3yOnRPtXqa8//fWvGZ/Etjeporw5/P8A/J4v/wA5VvFhj4tWUWx0FnM1hsxONeeFojse2beNxEjZt+ztVUk3VMkoNb2jD06ti7ZCtVglnmN9hjiByIn+JmVswKMyjkFxIXdnZ22dnZfX+l6NzVesxykeX1Jh8XHnIIpcFk6LVJa7uB7NUnjN39o/bs0fUtfwWgtA2fYmLJ6WG9ZyOPyt+xaPIWRkcq5nwM3CbBs+2xIYPltF0rlr0/hMP9y1/C48cdFmcJBfnrRyGccch++4SkIi2Wa5SYLk/wDJ90Jfs4qOrI1u5GZw0QhYgYhYHJxZt3dAcbREQBERAEREAREQBERAbXycatfRWpYM/Bh6WStVncq7WjkYQJ2dt9ozHdZLTmvqmByfsnT0XgnuRXHt05jOwRVidtmFvvntxbtZj4loSIDqVnll1HkNP09P5Sjjb+OgrTwS15hNwsFIfOc4WxdUgl71x2XMXkPd9jIW8XE6togLnOSeWXpJzknll6StogLnOSeWXpJzknll6StogLnOSeWXpJzknll6StogLnOSeWXpJzknll6StogLnOSeWXpJzknll6StogLnOSeWXpJzknll6StogLnOSeWXpJzknll6StogLnOSeWXpJzknll6StogLsch84Pty7W8Ku3TPpcvtn98/5SsR/hB+VlcvfjkvznV6idZb5w/LLzpxn5b+dUIllK+M/Lfzpxn5b+dUIlgr4z8t/OnGflv51QiWCvjPy386cZ+W/nVCJYK+M/Lfzpxn5b+dUIlgr4z8t/OnGflv51QiWCvjPy386cZ+W/nVCJYK+M/Lfzpxn5b+dUIlgucZ+W/pKRkTPpRe2fsHw/EobKVkvxp/kH6k6gWOM/Lfzpxn5b+dUIlgr4z8t/OnGflv51QiWCvjPy386cZ+W/nVCJYK+M/Lfzpxn5b+dUIlgr4z8t/OnGflv51QiWCvjPy386cZ+W/nVCJYK+M/Lfzpxn5b+dUIlgr4z8t/OnGflv51QiWC5xn5b+kpF4z44vbP+CFQ2Uq976L8yKdQLHGflP504z8p/OqESwV8Z+U/nTjPyn86oRLBXxn5T+dOM/KfzqhEsFfGflP504z8p/OqESwV8Z+U/nTjPyn86oRLBXxn5T+dOM/KfzqhEsFfGflP504z8p/OqESwV8Z+U/nTjPyn86oRLBXxn5T+dSLRn0et7Z/eP4fjURSbf4vW+Y/1ogWeM/Lfzpxn5b+dUIlgr4z8t/OnGflv51QiWCvjPy386cZ+W/nVCJYK+M/Lfzpxn5b+dUIlgr4z8t/OnGflv51QiWCvjPy386cZ+W/nVCJYK+M/Lfzpxn5b+dUIlgr4z8t/OnGflv51QiWCvjPy386kzmfQq/tn7S/K+NQ1Kn/Eq/yl9aqYLHGflv504z8t/OqEUsFfGflv504z8t/OqESwV8Z+W/nTjPy386oRLBdYj8t/OgOZFsxE7uvNnd3+VdY0tp3G6IwcOs9VWKk1+aAZ8Rh+Jiklc/eSyN4AWoQcn3HPJkWNdrfBdpK5MtO6WwGCbVPKNA88N82rY3Hf7WTY2E5dndthFZnlV1fkOTflAo47SswjWoYSOmwmO4kJu8jv9LLmXKVrrLa8zEGUygRQyV4BgAIhdgZmd3d/ld3Wu5PI3spaK1fsyWZnERc5H3J2Ftmb9DLs86hHmw9es88dM5y52V3d2uruOvaV5eL+Ow1Kll8ZHk7MNkWltHs5yVdn3j6299u/aqNT8th18R7B8nuKHT+OcHE5TFisO5b7szs7szLi3W7p1s6z7xkqrNe5Yedzq/HoVPLITu7mbu/xrzjPy386oRcbPUV8Z+W/nTjPy386oRLBXxn5b+dSXM/Y1vbP+Gfw/EyhqV/5a355/qZVELHGflv504z8t/OqEUspXxn5b+dOM/LfzqhEsFfGflv504z8t/OqESwV8Z+W/nTjPy386oRLBXxn5b+dOM/LfzqhEsFfGflv504z8t/OqESwXOck8svSTnJPLL0lbRLBc5yTyy9JOck8svSVtEsFznJPLL0lIAz9j5fbP78fyvlUNSov5ul+eKqBZ5yTyy9JOck8svSVtFkFznJPLL0k5yTyy9JW0QFznJPLL0k5yTyy9JW0QFznJPLL0k5yTyy9JW0QFTkRdru6pREAXuyP2qVWjCawEZyhAJEzPJJvwg3jfZnfb5GQjdEdPOth9gMV/vlhPVWv+insBif98sJ6q1/0V05kjHSw7fr+DXv07quMziNpIyISF92dn2dnWffA4lv/AOMsL6q1/wBFRqcGJqahqxXLTX8e04dIOoxNxhu3EwsYi+6jhJKyxyRk6Ranz+dnOIrGZyM5QlxRkdoycH7Nx3fqdWAymTHhcchabhEgHaYuoS98zdfY/hX0tpLTWE1FrSG9oqvpGzp6LKwRNYr0ZRvUBMT2aWKcGCVi7H98sFieSDR+TeieSymbC7kquRyBPXGFooxrG7OLC49pMywbPn+xZs2ObaxPLM0QsAMZO/CLeBt+xlJs5nLWqY07WVvTVh22hknMgbbs2F32W1crGksbpc8DYxFi3JTzWJhyMYWnF5Yuc7QdxZmdbRqyvh//AAhfK5fTGIwWWyE8JYKKmJBMcAttLIbE7u8ZeB3QHG0REAREQBERAEREAREQBFsmhNJZjWedHDYQaxWZGctprEcLbM2/5Ttv8jLJ6M5NtQ6qovboyUIIiudAg6VY5t7Fjh4ubjbZ+ItkBpCLetQ8m+fw2GwF5oZbs2YrT2Oi14TKWsMR8B8bMtFQBERAEREAREQBERAEREAREQBERAEREBXH+EH5WVy9+OS/OdW4/wAIPysrl78cl+c6q4E6ywiIoUIiIAiIgCIiAIiIAiIgCIiAIiIAylZL8af5B+pRVKyX40/yD9SvUCKiIoAiIgCIiAIiIAiIgCIiAIiIAiIgDKVe99F+ZFRWUq976L8yK11AioiLICIiAIiIAiIgCIiAIiIAiL3Z9t9upAPCvVUIEW+zO+zbvt4GWyaP0RqfVTyeweJsWgjEiI2HYOrwMT9W61GLbpKySlGKuTpGtO2z/YpFn8BW+a/1rbqfJdr63LEDaZvhzp82DyR8LM+zv179jLa6+jsJoKEczrqfHZWQQMKmKrT8405+2Z3kIewRXSOGT4ql3nGWoxrZO32Lc46/xda9bfi8K7XqDkemz9y3nNCS46bDTV2tVqoWeKYGdvwbi+77rScfyc6psakvYOSqFWxjeu7NObDFXHtYiJSWGadUIanFJXfDj2o0letv4/pXW8XyY6OuPHWHlLxXTCApDbmyaIWF9i9u6mTaR5IMe70rmu7Mlyu4nLLFX4oZh24nENvGz7LXQSq3XqZeqhdJN+TOXaf09m9QWDgweLt5CUB4jGCNzcW+NbBqfky1lp3HNkcliD6Kwu80sBNMMGz7O0jjvwuszneVGaqL4rk+rHpjE78RtE7PNYLyjJ1g+T7XWZ0xl+JppLeNtG/shRkLeO0Btwmx7+F2dXm418Lb8eoc7O1zkkl2Pj/Q0zbZGbr612nlE5HM3LqqG7prFxR4LKmJUtpOqAXASd5PJbtU0eS/k1wpxQam1/DJaKHnDCm7OO4+2Jt/jbsT3edtdnbsPfMainxvqW7OEbP4nRdwy0H8nyCfeC3m53cnLggF2DYuxty8lWo5+Q2tZDL1Wyu+PbgjoyC7tcMesJSfwM/hZXoN/wBS9TPvVraD9DXdM8kOqctSiyV/ouGoyEPBNkJWi5wX7SFn8TLMByG5yvm4YreYxvsQIlLeyMMnFFWANnPi8RcL7stB1lqvN6pyUlvK3rEovIRxwEbvHCxeAB7Bb5F5hdX5/E6fyWn6N548dk2YbUTiz8bN4nfsUUsSdU/UrhqGrUku6uHmdHLk65NstkK8eA5SK0cchtEYWonaRzLqFhWgcoeisxoXMxYzMNHz0sLSiUZbi4u7stXfrLwrpeiOULD19Pvp/XGBk1JjoTY6QnK4nW8phJnZ9nVuE1TVPt6g45cXxJuS7Nr8jRdO4bIZ/M18RioOfuWT4Iw3Zt3+V1uekeS3K5Hpt/OzBhcTjLB18hYnfY4iEeJ2EfC63fG8oPJJgrE+R07pK7QyMteWIDeRz5l3D2pjxO+zu7rl+tdeak1fWqVs5kHsRVB2jBhYWd+xyLbtJ0ccUFbdvu4EWTNldJc1dr4+RuValyH4yaOC7mc5lSEmlexBCwg4/BuLrIf+I3JvDjjnh5Nsf0iScoQB93F6zts5bu77SLiL7f8AbKRN+JV/731qLM1wSXkaelT/AFSb8/wdwz+mOS3K4/KYnRbzy5oKD5WCd5+ONhH2xwfKwrhTi7Pwluz77OzrZuTTU1rSGsqOdr7O0JsMwuO/FG77E3mUjllxj4nlR1DUbdxe4c4fNk++N9BJNqa5yVdWwwxeKbg22mrTfzNNTfftdeMts0BojN6xywU8dVk5luErE7tsEUbvs5u7rjGLk6R3nOMI3J0jVx3fqZ3+RbeHJprp8TFlA01fOpNC8wytHv7Rm3d3btZdBs8oGmNA049P6Qx1HMzQQEY5azWbnYrbk7OTb+BmWt6W5Z9Z4zUjZHI5i1dpzWBlt1ndtpBZ+sR8ld+jxxdSfp1HmeXNJc6EUl38X5GQ0fyVYa1hsZb1Nq6rhLmSbnK1SbZnKLy3d+xnZanyw5uLOcoWUs1XHoUEjVabB1i0MTcAcPxPw7/pULX+pbGrtV28xKDxjITBBD4IYh6gBtvEy1oupYyTjXNitu3tOmPFK+fN264dhQiIuJ3CIiAIiIAiIgClf+Wt+ef6mUVSv/LW/PP9TKojIqIihQiIgCIiAIiIAiIgCIiAIiIAiIgClRfzdL88VFUqL+bpfniqgRURFAEREAREQBERAEREB66M+y8dSa8J2Jwhj4eOQmEdyYW3fqbd32ZkKlZY/wC+1N/+91nfuVzHkUf8fB++n3K5jyKP+Pg/fUs69Bl/lfoYLb4lJoW7FC7BcqyHDYgMZIzHtEmfdnZZV9K5fyaH+Pg/fVipjI48/VxuWsx1IDmAJ5hMZGiAnbctxd2fZlTM8c4K2qNhLlV149iOyGfOGWOw1rjr1oYeOZm2Yz4Abjf526hw8oWsIOjlFnLAHXrz14dhH2kczu8g9nYW67BR5LdOHrapQxGmJMtijyUVWDKFmgs052IHLaYYWY4nLwLXMfyHnlRq2G1RjMdLkIrluCoUEpMENc3E9yQ5nK87nstm46MWSuyWQx9YatUTZm5uIewW2WX1Jr/VWpKpV81kILovGMbmdGu0vADbC3OMDHs3yr3lD0dLpCzi39kIb9TKUI79SxHG4cYH4xLsdltOU0ppW7yT5LWOIoZDHnTtQQV+evhZKwxbjI8gALPFs7e13QHJ0REAREQBERAEREAREQG+8huWwmA5R8Xn9QZLoNOgZSPtAcpSbgQ7Mw/Kt30LrPRuKxuKxeTzUwhp7UhZatNDTkdr0ZgzODN2xmzt+UuFogPo7VnLBpLU/J/BpmU7OMtWatl7N6GF3OI3nKQIH8qI+L22y+fOlO3U0Vcmbw80yiIrdAl9LL4Kv6kU6WXwVf1IqIiWyUS+ll8FX9SKdLL4Kv6kVERLYol9LL4Kv6kU6WXwVf1IqIiWxRL6WXwVf1Ip0svgq/qRUREtiiX0svgq/qRTpZfBV/UioiJbFEvpZfBV/UinSy+Cr+pFRES2KJfSy+Cr+pFOll8FX9SKiIlsUS+ll8FX9SKdLL4Kv6kVERLYomR2y4x+8V+1v9kyuW7ZNblbmK/vn7YmUKP8IPysrl78cl+c6tuhSsudLL4Kv6kU6WXwVf1IqIilsUS+ll8FX9SKdLL4Kv6kVERLYol9LL4Kv6kU6WXwVf1IqIiWxRL6WXwVf1Ip0svgq/qRUREtiiX0svgq/qRTpZfBV/UioiJbFEvpZfBV/UinSy+Cr+pFRES2KJfSy+Cr+pFOll8FX9SKiIlsUS+lv8DX9SKdLL4KD1IqIiWxRL6Y/wAFB6kVIvWiay7cxX7B7Y28SxvhUrJfjT/NH6lbdCkOll8FX9SKdLL4Kv6kVERS2KJfSy+Cr+pFOll8FX9SKiL3Z/ElsErpZfBV/UinSy+Br+pFSYsVkpZI4gx9opJGZwYYidyZ+tnZbt/4Ma/bEFkixIkAx8bwNMLzfJwM++63GE5cFZiWXHCraV95oL2iZ/wNf1Ir17ZfBQeqFb1g+TS9Ljr2Y1Zal0xjKZCBzWqpkchl+QAttu62HFaH5MdUzlhtLalyFXIwuJvcyrBHDYB/fsA7MTOKqwz9TEtRjV9aXFpWkcmjsSyGwDXhIn7G5pnd16NiUmJ+jwvt2/eW6l22LF6c5INPjqaHKYrVOatvzFaP30MTM7tITeF1Dl5ZMDTilxOE0JjWw0rMxxy7tKYm28wufX2v2Lp0Sj+qVM5rPKW+ONrtuvqcbe0Wzfeq/qhTpRdX3qu2/wDwhXYAzHIzWOrQr4Gcq+Xjfp1mybySYpyZ2EYvHs/W7o3JJpHHXYoc5yj0AG67DQeqHG7k/hk8kVOgb4NPzL7zFfrTXZtx9Dj72Sbthr+pFedMf4KD1QrrFfk10npiwR8pWpJKHEZNXpUw45pA32GQnbi4RdTK2n+RTOzVMdicpnqN7Jlw1+dYTGqW7iwH8RIsEutpPsvcPVQ4pNrtSdHG+ll8FB6kU6WTdkMHqRWy2eTnWUOWs40dP5A5q5sMhNC/CzOXCJb+J1seW5F9R0as3M5HD5C7BHzp0KtrjscDO7OTCsLFkfBHR58SpNrc5t0svga/qRUi5ZJji+81/wAEPbGyuWsBmasUEtjGXIgsE7QEcJDzjs+zsy91Hi8jibcNfJ0pqkr1wJglBxdxdu1Z+JJ2b50W9mQumP8AA1/UinTC+Cr+pFRFMx2Pu37A16VSaxMXvQiByd/MpbZp0uIe07dkMHqRRrRv2Q1/UitkxnJ9qu/qBsJ7D2a9niZjecHAItx4tyLsbqW51uR6tQZsnqTWGFhwINxFYp2OdkP4gD5eJluOLI+o5S1GKO1/c5Q9ovgq7/8ApCqnmlYGketDwO7sxc02zuulDnuRnHvZrxaLzWWif8HNbyHNm7s/YzR7bMpsHK3gYLNXGQ6AwsmnIHEQrWI+dnBnbaRxk8JEtrHFcZIy803+mD86RyZ7Rb/gq7/+iK9a0T9kUG/xxCut1NQ8i+WswVb+irOFaw5DYt17hn0byCAetnVMvINnjltS1sxhmqMZ9CKe0wnaDtAhZvKToZPeLvwJ7zBOsia8es5M9om/2Vfb80KrgknnkGKGrCZk7MIjCzu7uun4vk+0xpOQLXKZmo4LIxtMGFrblNIzjuwyEP4NR5+WG3j4mr6L05htMRMbkRw1wmkkZvecRSM/WydHzf1uu7iy9M5usavv4L+ph6PJxr67UOzBpWUQHbZjriJFv5LP2rZcfyUx05uHWGrNP4bw8yBBNK+zMRs4t2OzLn2U1nqvJ3Ird3UGRnmhMpIiKwXtCftcfEsJYmlsTnNOZSSGTkRE+7u7+F3Rzxrgm/F/gOGaXFpeCOo1cZyRBYawWsMhYggfnJKxYhojnZvyQPd9ndZjG8sOmK9mxQLk/wARFpo429xBAzySSjtsRGuIu+//AOCMizNfpSQemjL9Tb8/wdei5X8fj7XRsJoXB0cSYvDZiaPinsw+SUiwWruVDOZeGPG4oI8Hg6xN0ahU9qIbeEi7SL41z5+p9m3T4337Vh55tVZY6bGnaW/fubvX5VeUCs1hotTXSawLDJxkx7szbflb7LWbdyUoYCOOE3cXfrjZ/Csa3xKTZ/F6/wA1/rWXOTW7s6Rxxi9kkZLBakyuDyUOSxU41rUBMUZADdTstg1Pyp6x1FhIMPk8lzlaIdpdhZnseJ5PKdloj7u/jTr8boskkqT2EsUHJSaVok9ML4Gv6oU6YXwUHqRURFm2aol9LL4KD1IrzpZfA1/VCoqJbFG24vX2qsdQt0KmYnjrW4OjyxPsQvH5LcW+y157pv1vDX9Wyi9fWi05yfFkUIxbaXEk9LL4Kv6kU6WXwVf1IqIizbNEvpZfBV/UinSy+Cr+pFRES2CX0svgq/qRTpZfBV/UioiJbBL6WXwVf1Ip0svgq/qRUREtgl9ML4KD1Iq/LaJqcL8zX63L/ZssapU/4lX+UvrVTZGkVtaLfqir+qFdQ5a4p81r7EW8RSaWTO4qnajj5tiJyMOHZ1yUGffdl9RaSmwWN5HMHykT2+azuNxM9CkxkPAZsZiPtX7SZd8EeenFuuD9Dy6qfROMkre69eBqOo+RfM09H4e1RpBJmm4/ZiDjAuaYpPvbiLKxyv8AKTkMe93k/wANVqUaeOOKs9isDjIYxhs4P8XHutBocoWr6OpbWoquZnbJWmJpZT2LdnbbsLdm28C1m7ZtXrs1y1Kc1iYnOSQn3cifrd3VnmjFPmbX9DOPTzlJPK063Xi/wePcJ33eCv6pk6WXwUHqRURF5rZ7KJfSy+Cr+pFOll8FX9SKiIlspL6WXwVf1Ip0svgq/qRUREtkol9Lf4Gv6kU6WXwUHqRUREtiiX0svgq/qRTpZfBV/UioiJbFEvpZfBV/UinSy+Cr+pFRES2KJfTH+Cr+pFSHtF0Bn5iv+Ff/AGbbdjLGKX/5a355/qZVNhpDpZfBV/UinSy+Cr+pFREUtiiX0svgq/qRTpZfBV/UioiJbFEvpZfBV/UinSy+Cr+pFRES2KJfSy+Cr+pFOll8FX9SKiIlsUS+ll8FX9SKdLL4Kv6kVERLYol9LL4Kv6kU6WXwVf1IqIiWxRL6WXwVf1Ip0svgq/qRUREtiiX0svgq/qRTpZfBV/UioiJbFEvpj/BV/Uir8dougyvzNf3w/wCzZY1Sov5ul+eyqbDSPell8FX9SKdLL4Kv6kVERS2KJfSy+Cr+pFOll8FX9SKiIlsUS+ll8FX9SKdLL4Kv6kVERLYol9LL4Kv6kU6WXwVf1IqIiWxRfmneVmZ44h+YLCrCIoUIivxRSTyjFEBSSG7CIi27u79jMzIC1+l0/S6yn3O57+hMl/hT+xPudz39CZL/AAp/YlruF95ity8amULT078NtoYJ3hMT5ucGMD2ffYhftZ/Cyk/c7nv6FyX+FP7EoYW3YzlXETj0GexMEW9lnBg432Zy37GS11MWb7guWfN6em5zTWnNNYMTuBcsx1IZ3CyQb8Am0kx7A2/vQ4VGp8sOpqp0pI62M4qdO3Tj3iPrCy5PI7+37evqWyPyQ4Kjrutpa3f1PdtldGsUYYqOoNtnF3J4JzlMPTYVr9LkX1pkwC1jKlIa9pp5KkVjIQjMcURuBk48X5PhQGraw1ZktT18NXvx1gDEUQoVuZBxd4w7HPd33JZbK8ol21p69g8fp/T+Gq5F4nvlj68glZ5v3u7FIQg3hdoxBYbV+k8zpW7Uq5WKHiuVwtVjrzDNHNEfvSAhd2dbfqDkmt4HkqPWGSykcWRC1DFJiRh3kiCQXcCkLf2pPt7zZAcuREQBERAEREAREQBERAERSIa1iZneGCWRm7XAHdAR0WTvYnKY+nVu3cfarVrgkdWSWIhCcRfZ3B3bYmZ1jEARE2dAERVMLu+zM7oD1/l3XjdvbsptbH3ZwKSKpYMQbc3GN3YW32610bAcn+CxGMizHKNnSxATDzkGMhj4rk4djFt+Q3yrcMcpcDnkywgt/Rbs5a22z+2TxbuuxVcJyJ8RQDqrJTFeB44JZaxA1E2bqOTZm42d1TmOSPAYK8Xs3yj4GtVGR94495rHB2j7QfC7Lp7vKrTT8zn71C6aa8nucdbfwIy6ZygcluRw1STOYJzyumnAJYLwkJHwGzdZi3Wy0iHC5eeu88GLuSRMwu5hATszPuzdbN4dlzljlF00dI5YSVpmL7e3d0bd+1dXp8h+pbOLCxJlcDWunw7UZrvDM3EPEwk2z7G/gFaGemdQNkJce2FyBWod3OIK5kTMz7O+zN2KyxTVWhHNjndNbGF328bLzt8brYsZozVeUrTWcfp3J2oYC4JDirGTC/ZssdnMRk8HkDx+WpT0rQbccUo8JMsuMkraNKcW6TVmMREWTRXH+EH5WVy9+OS/OdW4/wAIPysrl78cl+c6q4ELLrxZC5jb9OCtYtVJ4orYcdczB2aQWfbcfGygbOjTXEJp8DxERQpU7dfajt8abda2vRugdU6s2PD4maWBzaN7BNwxA7+MnWoxbdJWZlOMVbdI1TqXrfpW+lyRcorSHG+lbjOAOROxATbN4Gdi2d/iU+nyRZbmoHzefwGn7dlt4qeTtczM49jO47dS2sU31GHqMa619Tmb7eP6E7Ox11CfRfJ1TMqdzlSg6Z2OVfGSyQiXhZybtZX6nI1PkIJb2J1ppa5jo+p7DWnHgJ/egYu3tXdXoZvhv5oz7zjW7bXimjlDv/3um266NHyN66Gy0d7GRUK7CZyW7NgBgjAHZnMjZ32ZZuDQPJS0IUZuU8DyxC+5R1iarxeAeNxRYZviq8SvU41wd+Cs49ts/ahN19XWuwhyFZzHyw2tR5zAYrEFsZ2yusXte1+BvC+ywOt+TPJYmJsxp15dQacOIZQyUEe4t4CY2brF2dR4Mi3aItTilJJP8epzt+v4163xrp+l+SPIZjAR5CxmsTi7lpuOjRt2GCSeIXdjN2d9xZlm48PyIYyQcPbz2UyNqYAilvQhtBXPd2Ix8bKrBJ7ul4sS1ME6Vt9ys4r8nUpOQ/GX+aP1LruRm5C8HJPjq1TK6kjlDnemDM8PNkO+0Q7iz7F4XUC3f5F7ZFFLgtRY+WcOuwFlpWrFt1cIu7cbKvClta9SLUN7qLrwOTrYMJo3VObrtZxOAyVyF32Y4K5ELv8AKtyo53QOio5bOmo7eoswYEEdrIVxCtXYm7WjfdyL5Vgs1yma0yb8B52xWg2ZmgrO0UY/IIqc2Mf1O/AvPyS/SqXa/wAGw6W0XpfAYqDO8ps+QotYlMaWPhj++ysHviNu0Rd+pTx5WtNQ5Dplbk1w0bzbR29yd+chZ+wR22Etu11y7UOdzGdtDZzORsX5hHhE5j4nZljh3L2vX5t1el5u0FX1M+78/fI7fjSOr5Ll11XYxluhUho0ecNmrWK8LDJVi8gHZc7HUOcG890Mve6S58byNOW7l41it37GRvi33WJZZy4s6QwY4ppJGz6v1vqfVkdaLPZWa0FcWABLqbq8Ls3aS1fd/GidrrMpNu27OkYxiqiqRU5EQsLu7s3Y3gbdW0RZKF7u/avEQEm1ZsWpOcsTyTSbM3GZOT7N2N1qmvNLXmjnhMo5YyYgNn2cSZ92dlYRWwdLyHLRygWq2PgbNHC9KPg44m4Sm8G8nlOtJxmaymOzEWWo3ZobsR84Mwl7Zn33WMZ+pG/StPJJu2zEcMIppJKzqMHLhrwbFqaxbq3CmZnhGxAxDVJurjjb8l1kYeUjTebxcEPKNpyxm71MWOrcgn5uSXifdwkfyFx5+t1JuNucW/wIrazT69/Hc5vS4+pV4bM7n9y/JINbI60hytW5UCi1iPTwz8MkUpMzMDkz79TrBZflvyTY6bGaa0/isFVfcIJq8f3+KLsYeNchfbbdk8Ddb+ZV53/Cq8DMdLG7m2+y+o6DPyw8oU+OPHy6gkkgOIoZOKIHIxJtn4i23d1oByGbMJG7s3Y2/Uypd38G+yp8K5SnKXF2d444QvmpIpREWTQUo7lqRgYrExMDMwM5O/Dt2bKKiAyGRv3cpcK3fsy2LBMLFJIXETsLMLbu/iZlA2Rl6hEqKUREKEREAREQBSbf4vW+Y/1qMpNv8XrfMf61UCMiIoAiIgCIiAIiIAiIgCIiAIiIAiIgCkz/AIlX+UvrUZSZ/wASr/KX1qoFl37Vmbeospa01T07LYZ8dTmOaCPhZnEj7X3WFXnYibXAjSdX1HiIihQiIgCIiAIiIAiIgCIiAIiIApX/AJa355/qZRVK/wDLW/PP9TKohFREUKEREAREQBERAEREAREQBERAEREAUqL+bpfnioqlRfzdL88VUCKiIoAiIgCIiAIiIAiIgCvRSyQyhLGZBIDs4kL7Ozt2OzqyiAyns/nP6ayP+KP7U9n85/TWR/xR/asZs/idNn8Tq0uwlGUfUGd/prI/4o/tVEF7jysVzKNLkAExeUJJSYpBbtHi7WWO2fxKXi6NnJZGvQpRPLYsyjFEDflET7MylLqRaOz6T5ccbpVooMNpnKy1fZCK2cOTzbWubYN2YIX5kOb7e3rULH8tYVZcZI2nHN6OOyFHbpu3OdKIi4/edXDusRFyT83qgdPXdZ4Pp0doK1upRgtWbcJF5EPMjz23haMiWAbk61vZArWO0lqC/R4yGOzFjJiCRhLh396gLuvNalqWHTLQUnoy4LFw0AkabieQo33Y+xuFZrIcsGosvybZTSWbs2sjPkLsVl7s07O4iDbODjw9e60TO4XMYC89HOYq7jLXCx8xagKGThfsfhJmfZ1s+u+Tmzo2tD7LakwpXpq0NoKMIWikeOQeIX43gaL9dAaIiIgCIiAIiIAiIgCIiAL6A/k72dU2dMHpqpg8s+m8hlmK7mcZblgkpkIdbmUfYDD1+3Xz+iA+rtXYLC5Lkj049Ph1Fn6uLvexdew7/foWslzk4/CSC3WwrluHucnWrsZHiM5DDo/I1mbmr9eNyCf2uzjI3gXJ2dt3d2fzr3bbZ3Z/Mtwnzeqznkx89cWmutHVbUvJPpGV2xwWNZ3x3dpJ94aodXk9TmqQ5UcZJKL2uT/TswRcPMAFdg5vyutvfbrlW3xfQvRfbwbrfTtcEl5HP3aL/U232t/g7N7LchduUcxZwWWpE7c2eKhPiD57GsfJytUqtXo+B0Zg8bzb7QT9FGWUR38Ll2uuTr3f4lr3iXUkvBBaWHW2/Fs6hHy2a3ijeOPLFELyMewVgZaNnctJnMpYyeUsW7Fqc3MzJ2fdYde7/G65yyyls3Z0hhhB3FJF/wBw/wBo+hemdU3ciew5P4XdnURFizdG2aJ1de0jloshirNpti++ROTOEoeESFbzkeX3Wk1jjqWgqRtMRgAQA78Dk7iDv4WZcd7fG68XSOacVzU6Rynp8c3ckmzN5PN2L+cmzNu1aK/NNz5zM7M/Hvvuy2keV/XDUyrPqXJELuLsb8PGOz79T7Lnj/pXm/xrKySXBmpYYSSTSdHSsvyvauyBVpBytmlJDEURlXdo2lcu0zZu01m8fqnSXKBj4qnKNk7VDI0RfmssI8Zzg7+8MRZca3XrP19q2s0r33Xec3psdLmqmutcTtlXFchmcplSp5nJ4OwLjJ0i/wC2Em3dnBlai1pyZe5NM19Gi2FMiCe9Ydnss5bBzgk3Z2brjHZvsyP1M2zbK9O1wSXkT3VPjJvz4HdLXJXoG/CdTT2vaJX6ZjJdnsTiEJRF2c343FRrEPJ5yZZGYbbx6uzrxk4cHCVWqe247+W+64sHv2+Vlctuz2pH3d24nWnmXFRSZFppPaU21/fWdVqctmYcCbLYrFZV4/xV7FIH6N1tuwfEvLnKppmyQxzcmmBOCNn4A2cdt+3rFclfZ16w7+PzLHTz62X3TFdpV5s63HX5GM3fjylvLZPAjMPFLjIqzyBEbdrCfkuvD1/ye4wei4Xk5rywyE/Pnek5wybbbYH/ACVyVm333+pGJt26k6drgkvIvuyf6m2uyzqljlI03imCtpHROLrQPs855CAbUkj9u3tuxmWF1dyh5HUFeKhC3sVioX4o6FFmiiYu1yfbtdaG++/WnWo80mqvY1HT44u6379zP19SZKAheHL5YOExNtrRe+bsdRMnkiydorWRt3rdg+opJpOIvO6xW6foWLb2Z0UYp2kSfcP9o+hXwshHXOsM1toTdiONi2Enbsd2WORSy0bMWrcwWIlxD5vLFQl2465T8QlssI70n+H+hRd902Vcm+JFFLgZe7lZrtWGrbvZGeCH8HHJNxCPg9qz9i2DQPKJntE2BLCXrA1+JyOsexRyP8bLSP0L1WOSSdp7klijJc1q0bXrvV97WeekzWZnmKwTcICGzDGG7uwt51r21Jvh/oUT5VUPao5OTtljCMUlHZIkN0LwdI+hXsh0TpJb8/vsPi8SxylZB2ey7s/F1D9SXsWtx7h/tH0J7h/tH0KKilgle4f7R9Ce4f7R9CioliiV7h/tH0J7h/tH0KKiWKJXuH+0fQnuH+0fQoqJYJXuH+0fQnuH+0fQoqJYole4f7R9Ce4f7R9CioliiV7h/tH0J7h/tH0KKiWKJXuH+0fQnuH+0fQoqJYol70v7R9Cv3eh8cX4f8EPiWNUq7s5xbPv96FW9hQ9w/2j6E9w/wBo+hRUUsEr3D/aPoT3D/aPoUVEsUSvcP8AaPoT3D/aPoUVEsUSvcP9o+hPcP8AaPoUVEsUSvcP9o+hPcP9o+hRUSxRK9w/2j6E9w/2j6FFRLFEn3F/x/oXvuH+0fQoqJZSV7h/tH0J7h/tH0KKiWSiXvS/tH0K9Z6HzFffn/ePt2eNY/dSLLs8FfZ+wH386qYo99w/2j6E9w/2j6FFRSxRK9w/2j6E9w/2j6FFRLFEr3D/AGj6E9w/2j6FFRLFEr3D/aPoT3D/AGj6FFRLFEr3D/aPoT3D/aPoUVEsUSvcP9o+hPcP9o+hRUSxRK9w/wBo+hPcP9o+hRUSxRK9w/2j6E9w/wBo+hRUSxRL3pf2j6Fem6J0OH8PtuW3YsfupEzs9KFt+tnJVMUe+4f7R9Ce4f7R9CiopYole4f7R9Ce4f7R9CioliiV7h/tH0J7h/tH0KKiWKJXuH+0fQnuH+0fQoqJYole4f7R9Ce4f7R9CioliiT7i/4/0L33D/aPoUVEspK9w/2j6E9w/wBo+hRUSyUSvcP9o+hPcP8AaPoUVEsUS96X9o+hXvcfsc34fbnX8XiZY/dSHdvY4W36+df6mVTFHvuH+0fQnuH+0fQoqKWKJXuH+0fQnuH+0fQoqJYole4f7R9Ce4f7R9CioliiV7h/tH0J7h/tH0KKiWKJXuH+0fQnuH+0fQoqJYole4f7R9Ce4f7R9CioliiV7h/tH0J7h/tH0KKiWKJXuH+0fQnuH+0fQoqJYol70v7R9CvRvU6DL+H9+PiWP3UmN29j5W36+MVUxQ9w/wBo+hPcP9o+hRUUsUSvcP8AaPoT3D/aPoUVEsUSvcP9o+hPcP8AaPoUVEsUSvcP9o+hPcP9o+hRUSxRem6Ps3Nc5v8A1tlZRFChSq1g6tqOxC4tJGTGLkLE27Pu27PuzqKiA2b7t9QfDUP+W1v3F792+oPhsf8A8tr/ALi1pFrpJdp06SfazZn1tn2/2lD/AJbW/cUIMoVzPV8hkrEkLtILyTU4wjMBbwiIsLcTLDP1+BXYIpbEwQwxlJKZMIiLbu7v2MyOUns2ZlOTVN2fRem+VzReJy9W/m7+S1RbjykVmDIT4mGvaqxALi+5iW8juoeH5YdN0psIZPlRGjisrUPgjb8JZM3B29subDyV6vG0MN6tQoDzwxTTWcjAIVSNncee4Td499vymWl24Hr2pYDIDeM3ByAtxd2fbdn8LLJk3XlV1Vi9TUNJQ41rDSYnCQ0LLygw7yB5Ozvuyz+b1xho+TTL6Yr6g1BqI75VnrDlIdhoNH77gd5D+a2zCuRLY8rpHP4nD1svkaQVa1kBlgaWxGMpgXvTaPi4+F/A+yA1xERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAXReR3BaW1LmIsFmMbmrVyzYFufpWwhjrQM25mfFGe/CudLdtEa/m0tgMphotO4TIwZNxazJaeyErg3+zY4Zo34H8LIDpWF5J9GTT4LGTX8hdtaksZFsdcrygEMMNf2sZELiTk5utCyGldP1+SEtTRzZE8vX1COLtAXAMLA8Mhvwdru+4drq/guVvMYXH16dDCYMegSWTxUphOUmMaw20gwu8vWP5zjWLi15IOgS0aem8LNVO4147UhWXnKwwuDG7tMwe9fbbh2QGc1NpbRz8lR6vxNXL4qd8gNWlHfshN04OHeQxYYw4eF1y1b7rvlFPWFSCG/pTT9OStEENeemdwHhAfyQApyiH0FoSAIiIAiIgCIiAIiIAiIgCIiALdOTDHYDMZkMRk8NmMrdtzRR1I6FoIGFnL25G5AfYy0tbpyfa8s6LgyQ08JiMiWRgavKdvnxOMPC0ZxSgQ8XhQHSa/JdoanZnO1dyWUoXNUtgMdJUshHzYsHGcpu4Gxu2+zMtXvaAwNLSvKActrIS5vS92vXBhYBgMJLDx7+EnfZY/TfKjewAzVsdpzT70PZCPJ1Kc42TjpWgHgaSJ3m493btYyNlHpco1uDA6hxVrAYbIlqCUZcjbtFZ56QxN5BduCYQbhJ/IQG8T8irY3kYzWp8vFlvZ6rBWtw144XavFDIbN7Ytn4i4Vwpbdhdc5vGaSzWmRkCalmWiGcpnMjjaMuJmB+Jmbd+1aigCIiAIiIAiIgCIiAIiIAiIgC2fQMGBu5foWaxWWycljhip18fYGEilImbciID6tvAzLWFt3J1rO1ou/auU8Ri8jNYrlAxXOfYoWLtKM4ZAMCfs3Z0B02/yZ6Ew8+o8jduZTJYmjmauJqhXsBHIByjxyOZ8BMXB8SxFvk201SHlMpT3snLkdKA0lThEBiMXlAGc+13fYlr+C5T7eEa/BU0tp4sdcsw2ix83SpIY54n3CUCKd5OLx7m7Oq8fyp5KEdSldweEyljUm7ZKe01ljMXJiYRaOYBFmJAbDY5KaVfk8q3a8ZZXUNjEll5II8kEL1q7djtA4EUuzdb7EK4uukVeVrUFTTQYiLH4grMWPPGx5Qo5HuhWN9yjYuPg+Ldw361zdAEREAREQBERAEREAREQBERAFm9LFhBy4+z1PIXajgTNDSmGKQzdvaNxEJbNv29TrCLZNA6nm0hqOHO18VjclPXYubjvDIUQO7bMbcBgTE3gfdAdVzXJnobEvnMtYfMy0sTjMfNYxTWoxsQ2rZ8PNnNwO2wM27+0VmLkr0pHynaj0pbvZYoquGmyWOKNgbdmg50WkJ1qFTlPs1b2Ulj0tgCp5eIAyNGaS5PFZID5wJCKSwUjSC/Y7GyvY7ldzVfVuV1TawmDyORyVc6xvZGwIRQkHA4RjHKHC3CgNx5MeSPTOpOT+nmr0uS6RaC6U0kdkA6LzQcQOEDg5zs7+QS4Iumaf5Xs5gsfRrUsLgnmxfP+xVuSKYpse0u7E0f3zhJm36ucE1zNAEREAREQBERAEREAREQBERAFmNNHhgzUL52tds0N344qcghKT7e1YSJiZutYdZ/ROoJNK6lqZ6DHY/ITVC5yOC9GRxOXgd2Ehfdu1utAdam5LdIxWnyFhstWq09LyZvJ4orQFZhNnYQi5zm2ZmLiZ93BWLPJ9o2rrDCYZsTqDJDqGtTtUY694AKuEv4XnCeJ+LgWpNyo3otU2s9W05g4pL9aark65SW5or8cnvml52cz9AgU+vyy5lrORkn05p6wFyjHjhjJrUfRqsbbNFGcc4mwl+VuZOSA2vEcl2gSy9alNk8hk6uZ1HPhsbbpzBGMQgzbSkziXH1kuI6hx5YrPZHFEfGVOzJXIvKcDcd/oW8aW5WMlpsBixundP8xXulex0UoWDbHzkHC5RO827/ACSOa5/etT3bk1uzI8k05lJIZdpET7u6AjIiIAiIgCIiAIiIAiIgCIiALIYkseGUrPlY55KDSC841yYZHHwsLvuzOsesnp/INiczTyRU6t3oswytXtA5RS8L78Jizs7i6A7Ri+SzSGYn05diDMYmvdo3sjfxtmyEtlq1dt4zjJox24/jFYXKaP0dTHTmRqYPUOTi1NQGTHY+C8DShYaVwMTPmn4h6urYFi7fK7lJdZRatg09g6mVFjCc45LkkdmIwcChkGWwbNHsT9QcKvYvlky1DIhag05p0YoMa+Np1mGyMdOJ3dyeMxnaVjLwk5oDMjojQUPK/c0LBWzucE7sUMEtS7FH0eN/wrm7gbE8f+i5Zq+lSxmqctjcXc6bRrXJYq9j4UBNxE/0str09ylvgY8vBjdHabjiywjHYj47zEIN2gErWWkYS/KZzWkZKzDbvS2IaNejEZbjXrkbxxt4heQjLb5SdAQkREAREQBERAEREAREQBERAFIqdH6TH0vnHh4m5zg24uHw7b+FR1MpTBXtxWDgisDGTE8cjO4SbPvsWzs+zoDt2A5NNE6nHStmh7NYZsvkLMb1rdkJ5J6cMJyvNG7AHD7zgWCzel9C0MLpvVMON1BPjM5FYjjx43Y3nGeMmEPvvN+9ffyFByPK/lLOpqGpq2m8BjsrRkbmJq5WyBo2AgeFo5ZzjGNxLZxERShyxZipm8Tfq6a03BVw8MsdDHDDP0euUj7lIDvNzjSeJ+NAbfFyKYq9yiR1Kz5iHAQV6UmViAWsW6didvxXcR2cm8JOOzLl3K3p2DSXKPnNO1AtDWoXDig6R+EcGf2rv1MvbGtLJanr5/G4ypibMVgbJx1bFkwnkE+LiN5pjJ/SWN1nqG7qvVOR1HkhhC3kbBzzDELsAkT77Czu7syAwaIiAIiIAiIgCIiAKZUmCCzFNLBFZEDYnhk4uA2Z9+EuF2fZ/Ds7OoaIDafulxH+4em/W3v/AM4T7pcR/uHpv1t7/wDOFrPnTzqdHH+/+506SRs76mxH+4enPXXv/wA4UejkxLVVHIUQpYFwnjcCiYzigdnb2+0hGT+N+tYB3fwujbv1MnNSdoy5NqmfUWl9RaAi1nV1VrC/pQNQjl4pI7+Eln5qePgJpDniJyAf0CKvaZ5UcDja2EpRaqhgox4vLPYg3fm+kFIZwOY7bOXkL51o6P1Tdt1alfT+VOa2bBAL1THjJ23Zhd2WFsQy17EkEwFHLGTgYF2sTPs7OqZOkctmosXqKTSORgvhlb4YKvHlZXJ3kknH3zSE/W5LeeV3U+i9QYTUeSluadyEl+KmWCCvRjiv0zEGaQJpAASdm229uRL53WXtaez1Wq9u1hcjBXZmd5ZKxiDM/wAbsgMQiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIApMDxDKzzgZRsTcQiWzu3hZndn2dRkVTpgzfSdOf0XlP8AmUf/AEU6Tpz+i8p/zKP/AKKwiLv7w+xeiJzUZt7Om/Disr/zIP8Aoq5gpo21ZjpsVTFzGzGUUFycSEzYm6iLYG2d1gFUszyuaqkvBUEqPr7A4+tnNZhm9Vhl9LnYzcEc2GvZgLVHINwnu8TMAODB2++Jli9N0NEBHhak+A0zaCxisvbsy2IAKUpYTPmtydfK8YHKbBGDkT9jM27uqXF2d2dtnZcSnS+XOph4m0lkcVUoVZclgK9m9FSAQj5992J+AeoXWS1hlbml+SGhpqTMT3MrqXgyGQjKdz6LWH8DE+7vsRe/dcgRAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAVK9CMRSi0puEbkzEbNxOzeF2bq3VjsdOx0KtjN9E09/S93/At++nRNPf0vd/wLfvrDbJssc19rO/TL+RfP8AJmSqafb/AM3ut/8AIt/1F7hwpDqeiEVaxlqzWA4q7RuElht23BhZy63WGcviVyGaWvME0Mhxyg7EJA+zi7djs7LSjXXZjJkUlSSXhZ9YaLpDq3WwZXT+QLG4mpm4IZsdYwsVK9j3ITZhimDdydn6iZ1gsLya6CvljGyuLyFq5kqGUyNiy11wfiryHsLA3lMy4Vd1zrS7JXluauz9k6xcdcpslMbwlttxA7l7V/kUOPUeoY2j4M5kxeOM4w2tm3AJ9Zi3X1MXhbwqnI2vlj0zhsHJpi5g68lWDN4WC+Vc5+NojPtZifwLsPLHhsMOhNWUaOKqxz4WDFMUBUY4QpOUXtygnFuKdj/rL5ovZG9fGuN25ZsjXiaKBppiJowbsEd+wW8TKZk9UaiymMhxeSzuUuUYNuZqz3DOGPZtm4RJ3ZtkBhEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAHV+tHzs4xcYhxEzcRvsLfG6sOvRQGe+51v6XxXrn+xPudb+l8X65/sWD3+L6E3+L6FDlzMn8/yM6WAF/wDzrFt/6z/Yo9Orj6+fqwZO00lDng6TJWLi+9u7cXD8bNusS+7qVjrdjH34btY+bngMZIz2Z9iZ92fZ1TUVNO3K/I+k9N6L0/mdaVZtIac0fd0+GVggjyAHPaOuBi+zWq80nDIxrXsXyLacyvQpbupbtS5kq1++0dfHg8UQVjJiFvb+Fm6lokHK9r2tYGxTylKlI1lrRPSxVSu0szbsxm0cQtJ/e3UOvyoa1r9GKPMsxVa09WF+ixPwRTu7yj1h+Vuhsr5S9G0NKXMDJUyVi1jc1jYchGc0TDLGJ9okLO7bsum8omg9FxaD1TfwmNoV6uGak+Ly8OQeaTINIDcbSA8jsJO/iAVxPUepMxqGHHQ5W000eNqjTqDzYBzUQ9g+1Zt/ldS8vrLOZHBx4KWapBjANjetToQVRlNm2Yz5oB5wm8ZboDWUREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAFegiknnCGIXOSQmERbtd36mZWUVQM39y+oP6Ls+in3L6g/ouz6Kw3E/jTifxrreLsfr/Q1t2GZ+5XP/wBFWfRV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QBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQH//2Q==";

const PROJECTS = [
  {
    id:"01", tags:["lbo","fin"], badge:"Independent Practice · Public Data · Educational",
    title:"PVR INOX — Leveraged Buyout",
    sub:"Take-Private LBO · India M&E · 10-Sheet Model",
    desc:"Independent practice LBO model built on public filings for educational purposes. Covers Sources & Uses, operating model, multi-tranche debt schedule (TLB + SSN + Mezz), covenant testing, GP/LP waterfall with 20% carry, and 4-scenario exit analysis across Strategic, Secondary PE and IPO routes. Built to develop real analyst-level LBO skills — not a live deal or client engagement.",
    metrics:[
      {val:"1.77x",lbl:"Gross MOIC",tip:"Multiple on Invested Capital — ratio of exit equity value to sponsor equity invested."},
      {val:"12.1%",lbl:"Gross IRR",tip:"Annualised return to the sponsor over the hold period, before fees and carry."},
      {val:"10.2%",lbl:"Net IRR (LP)",tip:"IRR after 2% management fee and 20% carried interest paid to the GP."},
      {val:"₹12,254",lbl:"Entry EV (Cr)",tip:"Modelled Enterprise Value at entry, based on public trading data and sector comps."},
    ],
    cap:[{l:"Sponsor Equity",p:72.3,c:"#B8973A"},{l:"Mgmt Rollover",p:3.6,c:"#D4AF55"},{l:"TLB",p:11.2,c:"#6EB5FF"},{l:"SSN",p:9.6,c:"#9AA3B2"},{l:"Mezz",p:3.2,c:"#B07AFF"}],
    tools:["LBO Modelling","Debt Schedule","GP/LP Waterfall","Covenant Testing","Scenario Analysis"],
    calc:true,
    relevantTo:["M&A · Private Equity","Leveraged Finance","Deal Structuring","Media & Entertainment IB"],
  },
  {
    id:"02", tags:["fin"], badge:"Independent Practice · Public Data · Educational",
    title:"HDFC Bank — Integrated Model",
    sub:"P/B Valuation · 13-Sheet Banking Model",
    desc:"Independent practice banking model built on public annual reports for educational purposes. Segment-wise loan book, deposit model, NII/NIM projections, asset quality (GNPA, PCR), Basel III capital adequacy (CET1, RWA) and P/B valuation with ROE–COE spread analysis using CAPM. Demonstrates methodology only — not a real transaction or advisory engagement.",
    metrics:[
      {val:"15.4%",lbl:"FY30E ROE",tip:"Projected Return on Equity for FY2030 — key driver of P/B-based banking valuations."},
      {val:"13.4%",lbl:"Total CAR",tip:"Capital Adequacy Ratio. Basel III minimum is 10.5%. Modelled at 13.4% — strong buffer."},
      {val:"13",lbl:"Sheets Built",tip:"Full 13-sheet model: 3-statement core, loan book, NII schedule, capital model and P/B valuation."},
      {val:"3.0x",lbl:"Target P/B",tip:"Price-to-Book target from ROE–COE spread analysis using Gordon Growth Model framework."},
    ],
    tools:["P/B Model","NII Forecast","CAPM","Basel III","Sensitivity"],
    relevantTo:["BFSI Coverage","Credit Analysis","Capital Markets","Banking Sector IB"],
  },
  {
    id:"03", tags:["fin"], badge:"Independent Practice · Public Data · Educational",
    title:"Hero MotoCorp — DCF",
    sub:"Auto & Mobility · Equity Research · BUY Rating · ₹6,150 Target",
    desc:"Independent equity research report built on public data for practice and educational purposes. Segment-wise volume and ASP modelling across motorcycles, scooters, EVs and exports. Three-statement model, WACC 11.3%, football field valuation and sensitivity analysis on terminal growth rate. All data from NSE/BSE public filings — demonstrates methodology, not a live research recommendation.",
    metrics:[
      {val:"₹6,150",lbl:"Target Price",tip:"Conservative DCF target — WACC 11.3%, terminal growth rate 5.0%, 5-year explicit forecast period."},
      {val:"11.2%",lbl:"Upside",tip:"Upside from CMP ₹5,573 to conservative DCF target ₹6,150 — consensus target ₹6,200 (+11.2%)."},
      {val:"11.3%",lbl:"WACC",tip:"WACC = 11.66% Ke x near-zero leverage. Rf 7.15% + Beta 0.82 x ERP 5.50%. Post-tax Kd 5.90%."},
      {val:"BUY",lbl:"Rating",tip:"BUY — risk-adjusted upside 11–15%, strong FCF growth, premiumisation and EV optionality.",rating:true},
    ],
    tools:["DCF","3-Statement Model","Football Field","Comparable Companies"],
    dcfCalc:true,
    relevantTo:["Equity Research","Auto & Mobility Coverage","Corporate Finance","IB Coverage"],
  },
  {
    id:"04", tags:["fin","ma"], badge:"Independent Practice · Public Data · Educational",
    title:"Mizuho × Avendus — Buy-Side M&A Model",
    sub:"Cross-Border Acquisition · SOTP Valuation · Deal at ₹4,700 Cr",
    desc:"Independent practice buy-side model on a publicly announced deal — Mizuho Securities' acquisition of Avendus Capital (₹4,700 Cr, 78.3% stake). Built SOTP valuation across three segments — IB & Equities (P/E), Wealth Management (% of AUM) and NBFC/AFPL (P/B). Includes 5-year standalone projections, WACC build, yen-carry synergy engine, EPS accretion/dilution analysis and IRR sensitivity matrix. All data from public sources (CareEdge, Business Standard, Hubbis). Educational model only — not affiliated with Mizuho or Avendus.",
    metrics:[
      {val:"₹4,700",lbl:"Deal Size (Cr)",tip:"Official deal consideration: ₹4,700 Cr for 78.3% stake in Avendus Capital. Source: Business Standard Dec 2025."},
      {val:"11.8%",lbl:"Base IRR",tip:"5-year IRR at base case: 12% revenue CAGR, 20x exit P/E. Sourced from IRR sensitivity matrix."},
      {val:"15.5%",lbl:"WACC (Ke)",tip:"Cost of Equity: CAPM with Rf 7.1%, ERP 5.5%, Beta 1.25, size premium 1.5%. Damodaran India ERP 2026."},
      {val:"SOTP",lbl:"Method",tip:"Sum-of-the-Parts across IB/Equities (P/E 20x), Wealth (4% of AUM), NBFC/AFPL (P/B 2.2x)."},
    ],
    tools:["SOTP Valuation","WACC Build","EPS Accretion","IRR Sensitivity","Comps & Precedents","Synergy Modelling"],
    relevantTo:["M&A · Buy-Side","Cross-Border Deals","IB Coverage · BFSI","Deal Structuring"],
  },
  {
    id:"05", tags:["fpa"], badge:"Independent Practice · Public Data · Educational",
    title:"Nestlé India — FP&A Model",
    sub:"FMCG · Budget vs Actual · Rolling Forecast · Variance Bridge",
    desc:"Independent practice FP&A model built on Nestlé India public annual reports for educational purposes. Covers Budget vs Actual with variance commentary, rolling forecast with quarterly locks, price/volume/mix variance bridge, scenario-driven sensitivity (Bull / Base / Bear) with a control panel dropdown, cash flow plan and KPI scorecard. Demonstrates corporate FP&A methodology — not an internal or client model.",
    metrics:[
      {val:"₹22,500",lbl:"FY25 Revenue (Cr)",tip:"FY2025 Actual Net Revenue — ₹500 Cr ahead of budget. Source: Screener.in / Annual Report."},
      {val:"23.6%",lbl:"EBIT Margin",tip:"FY2025 EBIT margin 23.6% — exactly on budget target. Revenue leverage offset A&P overspend."},
      {val:"8.8%",lbl:"Revenue Growth",tip:"FY2025 revenue growth 8.8% vs 6.8% budget target. Volume/Mix +4.2%, Pricing +4.6%."},
      {val:"3",lbl:"Scenarios",tip:"Bull / Base / Bear case — single control panel dropdown drives all linked output sheets automatically."},
    ],
    tools:["Budget vs Actual","Rolling Forecast","Variance Bridge","Scenario Analysis","KPI Scorecard","Excel FP&A"],
    relevantTo:["FP&A · Corporate Finance","FMCG Sector","CFO Office · Planning","Business Finance"],
  },
  {
    id:"06", tags:["auto"], badge:"Independent Practice · Live Deployment · Educational",
    title:"Robo Advisory Pipeline",
    sub:"n8n · Finance Operations Automation · End-to-End · Live on Vercel",
    desc:"Independent practice automation project built to learn finance workflow engineering. A fully automated advisory pipeline on n8n — triggers every Monday, fetches live NIFTY, NASDAQ and Gold data via APIs, merges client profiles from Google Sheets, generates personalised rebalancing recommendations and dispatches via Gmail. Includes onboarding, weekly pulse and reassessment flows. Deployed live on Vercel as a working prototype — built for learning, not a commercial service.",
    flow:["Master Trigger","Orchestration Router","Onboarding / Pulse / Reassessment Gates","Fetch NIFTY · Gold · NASDAQ","Merge + Personalise Per Client","Gmail Dispatch · Sheets Audit"],
    liveFlow: true,
    liveLink:"https://karthikeyank-adivisory.vercel.app/",
    img: "ROBO",
    tools:["n8n","REST APIs","Gmail Automation","Google Sheets API","Workflow Design","Vercel"],
    relevantTo:["Finance Operations","Wealth Management","FinTech · Robo-Advisory","Digital Advisory"],
  },
  {
    id:"07", tags:["ml"], badge:"Independent Practice · Public Data · Educational",
    title:"NIFTY 50 — Predictive Analytics",
    sub:"Capital Markets · ARIMA · XGBoost · LSTM — Model Comparison",
    desc:"Independent practice ML study on public NIFTY 50 historical data. Benchmarks ARIMA, SARIMA, XGBoost and LSTM across seasonality, volatility clustering and prediction accuracy — evaluating which model class suits short vs medium horizon decision support. Built entirely for learning and skill development in quantitative finance methods.",
    metrics:[
      {val:"4",lbl:"Models Compared",tip:"ARIMA, SARIMA, XGBoost and LSTM — evaluated on RMSE, MAE and directional accuracy."},
      {val:"5",lbl:"Years of Data",tip:"5 years of daily NIFTY 50 closing prices used for training and backtesting."},
    ],
    tools:["Python","ARIMA / SARIMA","LSTM","XGBoost","TensorFlow"],
    niftyChart: true,
    relevantTo:["Quantitative Research","Capital Markets","Investment Decision Support","Data-Driven Finance"],
  },
  {
    id:"08", tags:["auto","intern"], badge:"Live Industry Project · ITI Securities · Published Research", badgeType:"intern",
    title:"AHAM — Investor Risk Profiling & Portfolio Automation",
    sub:"FinTech · Adaptive Hybrid Asset Allocation Model · Co-authored Published Paper",
    desc:"Live industry project designed and deployed at ITI Securities Broking Ltd. during internship — not a practice model. Built the Adaptive Hybrid Asset Allocation Model (AHAM) end-to-end: automated investor risk profiling, portfolio allocation using MPT and SAA, Monte Carlo simulation, Dash dashboard and n8n client communication — deployed for real operational use. Co-authored and published as academic research with faculty guide. All data from live brokerage operations, NSE indices and real client onboarding flows.",
    metrics:[
      {val:"3",lbl:"Risk Profiles",tip:"Conservative, Moderate and Aggressive — each with a distinct AHAM-optimised asset allocation across Equity, Bonds and Gold."},
      {val:"0.58",lbl:"Best Sharpe",tip:"Gold BEES ETF Sharpe Ratio of 0.58 — highest among modelled asset classes. NIFTY 50 at 0.57, Bonds at 0.46."},
      {val:"14.3%",lbl:"NIFTY CAGR",tip:"NIFTY 50 delivered 14.29% CAGR (2020–2025) with 18.33% volatility — core equity growth component in AHAM portfolios."},
      {val:"SEBI",lbl:"Compliance",tip:"AHAM framework built to SEBI suitability norms — standardised digital onboarding and risk questionnaire aligned to regulatory guidelines."},
    ],
    flow:["Digital Investor Onboarding","Risk Questionnaire & Classification","AHAM Portfolio Allocation","Monte Carlo Simulation","Automated Dashboard & Report","n8n Client Communication"],
    liveFlow: true,
    ahamChart: true,
    publishedLink: true,
    tools:["Python","n8n","Monte Carlo Simulation","Dash / Bootstrap","Modern Portfolio Theory","SEBI Compliance"],
    relevantTo:["Wealth Management · FinTech","Investment Advisory","Finance Operations","Research & Strategy"],
  },
];

const SERVICES = [
  {
    icon:<svg width="26" height="26" viewBox="0 0 28 28" fill="none"><rect x="2" y="14" width="4" height="12" fill="#B8973A" opacity="0.8"/><rect x="8" y="10" width="4" height="16" fill="#B8973A" opacity="0.9"/><rect x="14" y="6" width="4" height="20" fill="#D4AF55"/><rect x="20" y="2" width="4" height="24" fill="#F0CC77"/><path d="M2 14L6 10L12 8L18 5L24 2" stroke="#B8973A" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    title:"Financial Modelling & Valuation",note:"IB · Corporate Finance · Advisory",
    desc:"DCF, LBO, P/B and 3-statement models built from public filings or client data. Equity research reports, deal support modelling and precedent transaction analysis — structured for IB, corporate finance and advisory teams.",
    tools:["DCF","LBO","3-Statement","Comparable Companies","Equity Research"],
  },
  {
    icon:<svg width="26" height="26" viewBox="0 0 28 28" fill="none"><path d="M3 5L14 2L25 5L25 16C25 21 20 25 14 27C8 25 3 21 3 16Z" stroke="#B8973A" strokeWidth="1.5" fill="none"/><path d="M9 14L13 18L20 10" stroke="#D4AF55" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title:"Financial Strategy & Planning",note:"FP&A · Budgeting · Decision Support",
    desc:"Financial planning frameworks, budget models, scenario analysis and business performance evaluation. Translating financial data into strategic decisions — built for corporate finance teams, CFO offices and growth-stage businesses.",
    tools:["FP&A","Budgeting","Scenario Modelling","Strategic Planning","Business Advisory"],
  },
  {
    icon:<svg width="26" height="26" viewBox="0 0 28 28" fill="none"><rect x="2" y="2" width="24" height="18" rx="1" stroke="#B8973A" strokeWidth="1.5" fill="none"/><rect x="5" y="5" width="8" height="5" fill="rgba(184,151,58,0.2)"/><rect x="15" y="5" width="8" height="5" fill="rgba(184,151,58,0.1)"/><rect x="5" y="12" width="18" height="2" fill="rgba(184,151,58,0.15)"/><path d="M11 20L11 24M17 20L17 24M7 24L21 24" stroke="#B8973A" strokeWidth="1.5"/></svg>,
    title:"MIS, Dashboard & Reporting",note:"Management Reporting · Live KPIs",
    desc:"Executive-ready Power BI dashboards and Excel MIS systems with live KPI tracking, variance analysis and management reporting packs. Built for banks, NBFCs, corporates and finance operations teams who need clean, decision-grade reporting.",
    tools:["Power BI","Advanced Excel","SQL","Variance Analysis","Management Reporting"],
  },
  {
    icon:<svg width="26" height="26" viewBox="0 0 28 28" fill="none"><rect x="2" y="2" width="11" height="11" rx="1" stroke="#B8973A" strokeWidth="1.5" fill="none"/><rect x="15" y="2" width="11" height="11" rx="1" stroke="#B8973A" strokeWidth="1.5" fill="rgba(184,151,58,0.1)"/><rect x="2" y="15" width="11" height="11" rx="1" stroke="#B8973A" strokeWidth="1.5" fill="rgba(184,151,58,0.1)"/><rect x="15" y="15" width="11" height="11" rx="1" stroke="#B8973A" strokeWidth="1.5" fill="none"/><path d="M13 7.5L15 7.5M13 20.5L15 20.5M7.5 13L7.5 15M20.5 13L20.5 15" stroke="#D4AF55" strokeWidth="1.5"/></svg>,
    title:"Business Workflow Automation",note:"Finance Ops · n8n + Python",
    desc:"End-to-end automation of finance operations — MIS generation, reporting pipelines, API integrations and advisory delivery systems. Remove manual repetition from finance workflows and scale operations without adding headcount.",
    tools:["n8n","Python","REST APIs","Process Automation","Workflow Strategy"],
  },
  {
    icon:<svg width="26" height="26" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="11" stroke="#B8973A" strokeWidth="1.5" fill="none"/><path d="M14 3L14 14L21 7" stroke="#D4AF55" strokeWidth="1.5" strokeLinecap="round"/><circle cx="14" cy="14" r="2" fill="#B8973A"/><path d="M6 14L22 14M14 6L14 22" stroke="#B8973A" strokeWidth="0.8" strokeOpacity="0.3"/></svg>,
    title:"Financial Research & Valuation Support",note:"Capital Markets · Equity Research",
    desc:"Equity analysis, capital structure research, sector reports and valuation support. Research covering comparable companies, precedent transactions and investment thesis — structured for academic, investor or management use.",
    tools:["Equity Research","Capital Structure","Credit Analysis","Comparable Companies","Report Writing"],
  },
  {
    icon:<svg width="26" height="26" viewBox="0 0 28 28" fill="none"><path d="M4 4L24 4L24 20L4 20Z" stroke="#B8973A" strokeWidth="1.5" fill="none"/><path d="M4 8L24 8M4 12L24 12M4 16L24 16M8 4L8 20M14 4L14 20M20 4L20 20" stroke="#B8973A" strokeWidth="0.6" strokeOpacity="0.3"/><rect x="8" y="8" width="6" height="4" fill="rgba(184,151,58,0.2)"/></svg>,
    title:"Predictive Analytics & Reporting",note:"Business Intelligence · Python",
    desc:"Time series forecasting and ML models for market analytics, demand forecasting and FP&A enhancement — ARIMA, XGBoost, LSTM pipelines with management-ready visualisation and business interpretation for finance teams.",
    tools:["Python","ARIMA / LSTM","XGBoost","Business Analytics","Visualisation"],
  },
];

function useIntroSplash(duration = 2800) {
  const [done, setDone] = useState(false);
  const [fading, setFading] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), duration);
    const t2 = setTimeout(() => setDone(true), duration + 800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [duration]);
  return { done, fading };
}

function IntroSplash({ fading }) {
  return (
    <div className={`intro-splash${fading ? " fade-out" : ""}`}>
      <div className="intro-greeting">Hi, I am</div>
      <div className="intro-name">
        <span className="intro-name-inner">Karthikeyan <em>K</em></span>
      </div>
      <div className="intro-line"/>
      <div className="intro-tagline">Corporate Finance · Investment Banking · Financial Analysis</div>
    </div>
  );
}

export default function Portfolio() {
  const stuck = useStuck();
  const typed = useTypewriter(PHRASES);
  const [activeFilter, setActiveFilter] = useState("All");
  useReveal();
  const { done, fading } = useIntroSplash(2600);

  return (
    <>
      <style>{CSS}</style>
      {!done && <IntroSplash fading={fading}/>}

      {/* OTW BANNER */}
      {/* NAV */}
      <nav id="nav" className={stuck?"stuck":""}>
        <a className="nav-brand" href="#hero" onClick={e=>{e.preventDefault();document.getElementById('hero')?.scrollIntoView({behavior:'smooth'});}}>
          <CrestLogo size={34}/>
          <div className="nav-name">karthikeyank<small>Corporate Finance · Investment Banking</small></div>
        </a>
        <ul className="nav-links">
          {["Projects","About","Services","Contact"].map(n=>(
            <li key={n}><a href={`#${n.toLowerCase()}`} onClick={e=>{e.preventDefault();document.getElementById(n.toLowerCase())?.scrollIntoView({behavior:'smooth'});}}>{n}</a></li>
          ))}
          <li><a href="https://www.linkedin.com/in/karthikeyan-k-b924843b4" target="_blank" rel="noreferrer" className="nav-linkedin">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="4" fill="#0A66C2" opacity="0.15"/><path d="M7 10V17M7 7V7.01M12 17V13C12 11.9 12.9 11 14 11C15.1 11 16 11.9 16 13V17M12 10V17" stroke="#0A66C2" strokeWidth="1.6" strokeLinecap="round"/></svg>
            LinkedIn
          </a></li>
          <li><span className="nav-avail"><span className="nav-avail-dot"/>Apr 2026</span></li>
          <li><button className="nav-cta" onClick={()=>document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}>Let&#39;s Talk</button></li>
        </ul>
      </nav>

      {/* HERO */}
      <section id="hero">
        <GeoBg/>
        <div className="hero-glow"/>
        <div className="hero-left">
          <div className="hero-eyebrow">
            <div className="eyebrow-line"/>
            <span className="eyebrow-text">Corporate Finance · Investment Banking · Available April 2026</span>
          </div>
          <h1 className="hero-h1">Karthikeyan <em>K</em></h1>
          <div className="hero-tags">
            <span className="htag"><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M6 1C4.07 1 2.5 2.57 2.5 4.5C2.5 7 6 11 6 11C6 11 9.5 7 9.5 4.5C9.5 2.57 7.93 1 6 1Z" stroke="#B8973A" strokeWidth="1" fill="rgba(184,151,58,0.15)"/><circle cx="6" cy="4.5" r="1.2" fill="#B8973A"/></svg>Coimbatore, TN</span>
            <span className="htag-div"/>
            <span className="htag htag-green"><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M6 1C4.07 1 2.5 2.57 2.5 4.5C2.5 7 6 11 6 11C6 11 9.5 7 9.5 4.5C9.5 2.57 7.93 1 6 1Z" stroke="#5ECFA0" strokeWidth="1" fill="rgba(94,207,160,0.12)"/><circle cx="6" cy="4.5" r="1.2" fill="#5ECFA0"/></svg>Open to Chennai &amp; Bangalore</span>
          </div>
          <p className="hero-h1-sub">
            Financial analyst with hands-on modelling across <strong>LBO, DCF and integrated banking</strong> — built independently on real public data, deployed at a live brokerage, and published as academic research. Available from April 2026.
          </p>
          <div className="hero-typed-wrap">
            <span className="hero-typed">{typed}<span className="caret"/></span>
          </div>
          <div className="hero-ticker-wrap">
            <div className="hero-ticker">
              {TICKER_ITEMS.map((item,i)=>(
                <span className="ticker-item" key={i}>
                  <span className="ticker-label">{item}</span>
                  <span className="ticker-dot"/>
                </span>
              ))}
            </div>
          </div>
          <div className="hero-actions">
            <button className="btn-gold" onClick={()=>document.getElementById('projects')?.scrollIntoView({behavior:'smooth'})}>See the Work</button>
            <button className="btn-ghost" onClick={()=>document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}>Let&#39;s Talk</button>
          </div>
        </div>
        <div className="hero-right">
          <AnalystPanel/>
        </div>
      </section>

      <div className="rule"><div className="rule-line"/><div className="rule-diamond"/><div className="rule-line"/></div>

      {/* PROJECTS — moved up: show evidence first */}
      <div id="projects" className="proj-bg">
        <div className="proj-inner">
          <div className="sec-eye reveal"><div className="sec-line"/></div>
          <h2 className="sec-title reveal">The work. <em>All built independently.</em></h2>
          <p className="sec-sub reveal">Eight models built from scratch on real public filings — DCF, LBO, M&amp;A buy-side, FP&amp;A, banking, ML forecasting and deployed automation. Every metric is live. Hover for methodology.</p>
          <div className="proj-disclaimer reveal">
            <span className="proj-disclaimer-text">
              <span>Transparency — </span>
              7 of 8 projects are independent practice models built on public data (NSE/BSE filings, annual reports) for learning and skill development — not real transactions or client work. The exception is <span>AHAM (Project 08)</span>, which is a live industry project designed, built and deployed at ITI Securities Broking Ltd. during internship, and co-authored as published research.
            </span>
          </div>
          <div className="proj-filter reveal">
            {Object.keys(FILTER_MAP).map(f=>(
              <button key={f} className={`pf-btn${activeFilter===f?" active":""}`} onClick={()=>setActiveFilter(f)}>{f}</button>
            ))}
          </div>
          <div className="proj-grid">
            {PROJECTS.map((p,i)=>{
              const visible = FILTER_MAP[activeFilter](p);
              return (
                <div key={p.id} className={`pcard reveal d${(i%2)+1}${!visible?" hidden":""}`}>
                  <div className="pcard-top">
                    {p.badge&&<span className={`pcard-badge${p.badgeType?" "+p.badgeType:""}`}>{p.badge}</span>}
                  </div>
                  <div className="ptags">{p.tags.map(t=><span key={t} className={`ptag ${TAG_MAP[t][0]}`}>{TAG_MAP[t][1]}</span>)}</div>
                  <div className="pcard-title">{p.title}</div>
                  <div className="pcard-sub">{p.sub}</div>
                  <div className="pcard-desc">{p.desc}</div>
                  {p.metrics&&<div className="pmetrics">{p.metrics.map(m=><MetBox key={m.lbl} val={m.val} lbl={m.lbl} tip={m.tip} rating={m.rating}/>)}</div>}
                  {p.calc&&<LBOCalc/>}
                  {p.dcfCalc&&<DCFCalc/>}
                  {p.niftyChart&&<NiftyChart/>}
                  {p.ahamChart&&<AHAMChart/>}
                  {p.cap&&(
                    <div className="cap-box">
                      <div className="cap-title">Modelled Capital Structure</div>
                      <div className="cap-bar">{p.cap.map(s=><div key={s.l} className="cap-seg" style={{width:`${s.p}%`,background:s.c}} title={`${s.l}: ${s.p}%`}/>)}</div>
                      <div className="cap-legend">{p.cap.map(s=><div key={s.l} className="cap-leg"><div className="cap-dot" style={{background:s.c}}/>{s.l} {s.p}%</div>)}</div>
                    </div>
                  )}
                  {p.flow&&(
                    <div className="flow-box">
                      <div className="flow-title">
                        {p.liveFlow && <span className="flow-live-dot"/>}
                        {p.liveFlow ? "Live Automation Flow" : "Automation Flow"}
                      </div>
                      <div className="flow-nodes">
                        {p.flow.map((n,j)=>(
                          <span key={j} style={{display:"flex",alignItems:"center",gap:5}}>
                            <span className={`fnode${p.liveFlow?" fnode-live":""}`} style={p.liveFlow?{animationDelay:`${j*0.18}s`}:{}}>{n}</span>
                            {j<p.flow.length-1&&<span className="farrow">›</span>}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {p.img&&(
                    <div className="pcard-screenshot">
                      <img src={p.img==="ROBO"?ROBO_IMG:p.img==="NIFTY"?NIFTY_IMG:p.img} alt={p.title+" screenshot"} className="pcard-img"/>
                    </div>
                  )}
                  <div className="ptools">
                    {p.tools.map(t=>{
                      const Logo = getToolLogo(t);
                      return (
                        <span className="ptool" key={t}>
                          {Logo && <span className="ptool-logo"><Logo/></span>}
                          {t}
                        </span>
                      );
                    })}
                  </div>
                  {p.relevantTo&&(
                    <div className="pcard-relevant">
                      <span className="pcard-relevant-label">Relevant to</span>
                      {p.relevantTo.map(r=><span className="pcard-relevant-chip" key={r}>{r}</span>)}
                    </div>
                  )}
                  {p.liveLink&&(
                    <div className="pcard-links">
                      <a href={p.liveLink} target="_blank" rel="noreferrer" className="pcard-live-chip">
                        <span className="live-dot"/>Live Demo ↗
                      </a>
                    </div>
                  )}
                  {p.publishedLink&&(
                    <div className="pcard-links">
                      <span className="pcard-published-chip">✦ Published Research</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="rule"><div className="rule-line"/><div className="rule-diamond"/><div className="rule-line"/></div>

      {/* COMPETENCY GRID */}
      <div className="comp-bg">
        <div className="comp-inner">
          <div className="sec-eye reveal"><div className="sec-line"/></div>
          <h2 className="sec-title reveal">Core <em>competencies</em></h2>
          <p className="sec-sub reveal">The analytical and deal-ready skills developed through independent project work — built on real public data, not textbook exercises.</p>
          <div className="comp-grid">
            {COMPETENCIES.map((c,i)=>(
              <div key={c.title} className={`comp-card reveal d${(i%4)+1}`}>
                <div className="comp-icon-wrap">{c.icon}</div>
                <div className="comp-title">{c.title}</div>
                <div className="comp-desc">{c.desc}</div>
                <span className="comp-tag">{c.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rule"><div className="rule-line"/><div className="rule-diamond"/><div className="rule-line"/></div>

      {/* ABOUT */}
      <section id="about" className="section">
        <div className="sec-eye reveal"><div className="sec-line"/></div>
        <h2 className="sec-title reveal">Background &amp;<br/><em>credentials</em></h2>
        <p className="sec-sub reveal">MBA Finance · Financial Analyst Intern · 8 practice &amp; industry projects · 5 certifications. Available April 2026.</p>
        <div className="about-grid">
          <div className="about-prose reveal">
            <p>MBA (Finance &amp; Business Analytics) candidate with hands-on experience in financial modeling, valuation, and corporate performance analysis. Developed integrated three-statement, DCF, and LBO models to evaluate investment feasibility and capital structure decisions. Built FP&amp;A forecasting and variance models to assess revenue growth, margin trends, and cost structures. Strong foundation in financial statement analysis and cash flow interpretation. Seeking entry-level roles in FP&amp;A, Corporate Finance, Valuation, or Investment Banking.</p>
            <p>At <strong>ITI Securities Broking Pvt. Ltd.</strong> I worked as a Financial Analyst Intern (Jun–Jul 2025) — supporting daily trading and settlement data analysis, preparing Excel-based MIS, exposure and reconciliation reports, and assisting in risk monitoring, compliance checks and capital markets operations. During this internship I also designed and deployed the <strong>AHAM framework</strong> — a live operational system for automated investor risk profiling and portfolio allocation, co-authored and published as academic research. This is the only live industry project in this portfolio.</p>
            <p>All other models — LBO, DCF, banking, M&amp;A, FP&amp;A, ML — are <strong>independent practice projects built on public data</strong> (NSE/BSE filings, annual reports) for learning and skill development. They demonstrate methodology — not real transactions or client engagements.</p>
            <div className="about-note">
              <span className="about-note-text">Seeking entry-level roles in FP&amp;A, Corporate Finance, Valuation or Investment Banking. Open to Chennai, Bangalore and remote opportunities from April 2026.</span>
            </div>
            <div className="about-items">
              {[
                "MBA Finance & Business Analytics — Sri Ramakrishna College of Arts and Science, Coimbatore (2024–2026)",
                "BBA — Sri Ramakrishna College of Arts and Science, Coimbatore (2021–2024)",
                "Financial Analyst Intern — ITI Securities Broking Pvt. Ltd., Coimbatore (Jun–Jul 2025)",
                "Co-Author — Published Research: AHAM Framework (2025)",
                "Financial Modelling & Valuation — Internshala (Jan–Feb 2026)",
                "Advanced Financial Statement & Ratio Analysis — Udemy (Dec 2025–Feb 2026)",
                "AI for All & Data Visualisation — GUVI (Dec 2025–Feb 2026)",
                "Power BI Workshop — SRCAS (Jan 2025)",
              ].map(t=>(
                <div className="about-item reveal" key={t}><div className="about-dot"/><span className="about-item-text">{t}</span></div>
              ))}
            </div>
          </div>
          <div className="skills-col reveal d2">
            {[
              {cat:"FP&A Modelling", chips:["Driver-Based Forecasting","Budgeting & Planning Models","Rolling Forecasts","Budget vs Actual","Revenue & Cost Modelling","Margin & Profitability Analysis","Variance Analysis"]},
              {cat:"Financial Modelling & Valuation", chips:["3-Statement Modelling","DCF Modelling","LBO Modelling","IRR & NPV Analysis","WACC Calculation","CAPM Estimation","Comparable Companies","Exit Multiple Valuation","Sensitivity & Scenario Analysis","SOTP Valuation"]},
              {cat:"Advanced Excel", chips:["Dynamic Model Building","Scenario Manager","Goal Seek","Data Tables","Pivot Tables","XLOOKUP","INDEX-MATCH","Dynamic Dashboards"]},
              {cat:"BI & Data Tools", chips:["Power BI","Python","Pandas","NumPy","Financial Dashboards","KPI Tracking","Scenario Simulation"]},
              {cat:"Process Automation", chips:["n8n Workflow Automation","Automated Reporting Pipelines","Portfolio Reporting Automation","Trigger-Based Processing","Email & Reporting Automation","Google Sheets API"]},
              {cat:"Professional Skills", chips:["Requirement Understanding","Documentation","Stakeholder Communication","Problem Solving"]},
            ].map(g=>(
              <div key={g.cat}>
                <div className="skill-cat">{g.cat}</div>
                <div className="chips">
                  {g.chips.map(c=>{
                    const Logo = getToolLogo(c);
                    return (
                      <span className="chip" key={c}>
                        {Logo && <span style={{display:"inline-flex",alignItems:"center",marginRight:4,verticalAlign:"middle"}}><Logo/></span>}
                        {c}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="rule"><div className="rule-line"/><div className="rule-diamond"/><div className="rule-line"/></div>

      {/* TIMELINE */}
      <div className="tl-bg">
        <div className="tl-inner">
          <div className="sec-eye reveal"><div className="sec-line"/></div>
          <h2 className="sec-title reveal">My <em>journey</em></h2>
          <p className="sec-sub reveal">Education, internship, certifications and projects — the sequence that got me here.</p>
          <Timeline/>
        </div>
      </div>

      <div className="rule"><div className="rule-line"/><div className="rule-diamond"/><div className="rule-line"/></div>

      {/* WHAT SETS ME APART */}
      <div className="edge-bg">
        <div className="edge-inner">
          <div className="sec-eye reveal"><div className="sec-line"/></div>
          <h2 className="sec-title reveal">What makes me <em>different</em></h2>
          <p className="sec-sub reveal">Three things that separate this profile from a typical MBA finance candidate.</p>
          <div className="edge-grid">
            {EDGE_ITEMS.map((e,i)=>(
              <div key={e.tag} className={`ecard reveal d${i+1}`}>
                <div className="ecard-icon-wrap">{e.icon}</div>
                <div className="ecard-title" dangerouslySetInnerHTML={{__html:e.title}}/>
                <div className="ecard-body" dangerouslySetInnerHTML={{__html:e.body}}/>
                <span className="ecard-tag">{e.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rule"><div className="rule-line"/><div className="rule-diamond"/><div className="rule-line"/></div>

      {/* SERVICES */}
      <section id="services" className="section">
        <div className="sec-eye reveal"><div className="sec-line"/></div>
        <h2 className="sec-title reveal">What I can <em>deliver</em></h2>
        <p className="sec-sub reveal">Analyst-level financial and analytical capabilities — relevant to Corporate Finance, IB and finance operations roles, and available for project work alongside full-time pursuit.</p>
        <div className="svc-grid">
          {SERVICES.map((s,i)=>(
            <div key={s.title} className={`scard reveal d${(i%3)+1}`}>
              <div className="scard-icon">{s.icon}</div>
              <div className="scard-title">{s.title}</div>
              {s.note&&<div className="scard-note">{s.note}</div>}
              <div className="scard-desc">{s.desc}</div>
              <div className="scard-tools">{s.tools.map(t=><span className="stool" key={t}>{t}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="rule"><div className="rule-line"/><div className="rule-diamond"/><div className="rule-line"/></div>

      {/* CONTACT */}
      <div id="contact" className="contact-bg">
        <div className="contact-inner">
          <div className="contact-crest-wrap reveal"><CrestLogo size={52}/></div>
          <h2 className="contact-big reveal">Ready to contribute.<br/><em>From day one.</em></h2>
          <p className="contact-sub reveal">
            I am a final-year MBA student graduating April 2026, actively targeting analyst-level roles in Corporate Finance and Investment Banking. I am open to relocating and ready to have a direct conversation about fit.
          </p>
          <div className="cot-grid reveal">
            <div className="cot-card">
              <div className="cot-card-label"><div className="cot-dot"/>Primary — Full-Time Roles</div>
              <div className="cot-items">
                {["Corporate Finance Analyst","Investment Banking Analyst","Capital Markets Analyst","Equity Research Analyst","M&A / Transaction Support"].map(r=><div className="cot-item" key={r}>{r}</div>)}
              </div>
            </div>
            <div className="cot-card">
              <div className="cot-card-label"><div className="cot-dot"/>Availability</div>
              <div className="cot-items">
                {["Graduating April 2026","Coimbatore, Tamil Nadu","Willing to Relocate — Chennai · Bangalore","Available Immediately Post-Graduation","Open to Remote / Hybrid"].map(r=><div className="cot-item" key={r}>{r}</div>)}
              </div>
            </div>
            <div className="cot-card">
              <div className="cot-card-label"><div className="cot-dot"/>Freelance Projects</div>
              <div className="cot-items">
                {["Financial Modelling & Valuation","FP&A & Financial Planning","MIS & Dashboard Reporting","Finance Process Automation","Capital Markets Research"].map(r=><div className="cot-item" key={r}>{r}</div>)}
              </div>
            </div>
          </div>
          <div className="contact-email-wrap reveal">
            <a href="mailto:thekarthikeyank@gmail.com" className="contact-email">thekarthikeyank@gmail.com</a>
          </div>
          <div className="contact-btns reveal">
            <a href="https://www.linkedin.com/in/karthikeyan-k-b924843b4" target="_blank" rel="noreferrer" className="btn-ghost">LinkedIn</a>
            <a href="https://github.com/thekarthikeyank" target="_blank" rel="noreferrer" className="btn-ghost">GitHub</a>
            <a href="https://github.com/thekarthikeyank/Resume/raw/main/KARTHIKEYAN-K-Resume.pdf" target="_blank" rel="noreferrer" className="btn-ghost">Download Resume</a>
            <a href="mailto:thekarthikeyank@gmail.com" className="btn-gold">Email Me</a>
          </div>
        </div>
      </div>

      <footer>
        <div className="foot-l">© 2026 Karthikeyan K · Corporate Finance · Investment Banking · Financial Analysis</div>
        <div className="foot-r">MBA Finance · Sri Ramakrishna College of Arts and Science, Coimbatore · Graduating April 2026 · <a href="https://github.com/thekarthikeyank" target="_blank" rel="noreferrer">GitHub</a></div>
      </footer>
    </>
  );
}
