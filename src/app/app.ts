import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import lottie from 'lottie-web';
import { environment } from '../environments/environment';

const lottieEngine = (lottie as any).default || lottie;

const DIRECT_LOTTIE_DATA = {
  "v": "5.7.6",
  "fr": 30,
  "ip": 0,
  "op": 60,
  "w": 540,
  "h": 540,
  "nm": "H2H Graphic Template",
  "ddd": 0,
  "assets": [
    { "id": "image_crest_home", "w": 100, "h": 100, "u": "", "p": "", "e": 0 },
    { "id": "image_crest_away", "w": 100, "h": 100, "u": "", "p": "", "e": 0 }
  ],
  "layers": [
    { "ddd": 0, "ind": 1, "ty": 2, "nm": "Image_Crest_Home", "refId": "image_crest_home", "ks": { "o": { "a": 0, "k": 100 }, "p": { "a": 0, "k": [135, 270, 0] }, "s": { "a": 0, "k": [100, 100, 100] } }, "ao": 0, "ip": 0, "op": 60, "st": 0, "bm": 0 },
    { "ddd": 0, "ind": 2, "ty": 2, "nm": "Image_Crest_Away", "refId": "image_crest_away", "ks": { "o": { "a": 0, "k": 100 }, "p": { "a": 0, "k": [405, 270, 0] }, "s": { "a": 0, "k": [100, 100, 100] } }, "ao": 0, "ip": 0, "op": 60, "st": 0, "bm": 0 },
    { "ddd": 0, "ind": 3, "ty": 5, "nm": "Text_Team_Home", "ks": { "o": { "a": 0, "k": 100 }, "p": { "a": 0, "k": [135, 180, 0] } }, "ao": 0, "text": { "document": { "k": [{ "s": { "s": 24, "f": "Arial", "t": "HOME TEAM", "j": 1, "fc": [1, 1, 1], "tr": 40 } }] } }, "ip": 0, "op": 60, "st": 0, "bm": 0 },
    { "ddd": 0, "ind": 4, "ty": 5, "nm": "Text_Team_Away", "ks": { "o": { "a": 0, "k": 100 }, "p": { "a": 0, "k": [405, 180, 0] } }, "ao": 0, "text": { "document": { "k": [{ "s": { "s": 24, "f": "Arial", "t": "AWAY TEAM", "j": 1, "fc": [1, 1, 1], "tr": 40 } }] } }, "ip": 0, "op": 60, "st": 0, "bm": 0 },
    { "ddd": 0, "ind": 5, "ty": 5, "nm": "Text_Label_1", "ks": { "o": { "a": 0, "k": 100 }, "p": { "a": 0, "k": [270, 340, 0] } }, "ao": 0, "text": { "document": { "k": [{ "s": { "s": 16, "f": "Arial", "t": "LEAGUE POSITION", "j": 1, "fc": [1, 1, 1], "tr": 40 } }] } }, "ip": 0, "op": 60, "st": 0, "bm": 0 },
    { "ddd": 0, "ind": 6, "ty": 5, "nm": "Text_Stat_1_Home", "ks": { "o": { "a": 0, "k": 100 }, "p": { "a": 0, "k": [135, 340, 0] } }, "ao": 0, "text": { "document": { "k": [{ "s": { "s": 20, "f": "Arial", "t": "1", "j": 1, "fc": [1, 1, 1], "tr": 140 } }] } }, "ip": 0, "op": 60, "st": 0, "bm": 0 },
    { "ddd": 0, "ind": 7, "ty": 5, "nm": "Text_Stat_1_Away", "ks": { "o": { "a": 0, "k": 100 }, "p": { "a": 0, "k": [405, 340, 0] } }, "ao": 0, "text": { "document": { "k": [{ "s": { "s": 20, "f": "Arial", "t": "2", "j": 1, "fc": [1, 1, 1], "tr": 140 } }] } }, "ip": 0, "op": 60, "st": 0, "bm": 0 },
    { "ddd": 0, "ind": 8, "ty": 5, "nm": "Text_Label_2", "ks": { "o": { "a": 0, "k": 100 }, "p": { "a": 0, "k": [270, 380, 0] } }, "ao": 0, "text": { "document": { "k": [{ "s": { "s": 16, "f": "Arial", "t": "TOTAL POINTS", "j": 1, "fc": [1, 1, 1], "tr": 40 } }] } }, "ip": 0, "op": 60, "st": 0, "bm": 0 },
    { "ddd": 0, "ind": 9, "ty": 5, "nm": "Text_Stat_2_Home", "ks": { "o": { "a": 0, "k": 100 }, "p": { "a": 0, "k": [135, 380, 0] } }, "ao": 0, "text": { "document": { "k": [{ "s": { "s": 20, "f": "Arial", "t": "0", "j": 1, "fc": [1, 1, 1], "tr": 140 } }] } }, "ip": 0, "op": 60, "st": 0, "bm": 0 },
    { "ddd": 0, "ind": 10, "ty": 5, "nm": "Text_Stat_2_Away", "ks": { "o": { "a": 0, "k": 100 }, "p": { "a": 0, "k": [405, 380, 0] } }, "ao": 0, "text": { "document": { "k": [{ "s": { "s": 20, "f": "Arial", "t": "0", "j": 1, "fc": [1, 1, 1], "tr": 140 } }] } }, "ip": 0, "op": 60, "st": 0, "bm": 0 },
    { "ddd": 0, "ind": 11, "ty": 5, "nm": "Text_Label_3", "ks": { "o": { "a": 0, "k": 100 }, "p": { "a": 0, "k": [270, 420, 0] } }, "ao": 0, "text": { "document": { "k": [{ "s": { "s": 16, "f": "Arial", "t": "POINTS PER GAME", "j": 1, "fc": [1, 1, 1], "tr": 40 } }] } }, "ip": 0, "op": 60, "st": 0, "bm": 0 },
    { "ddd": 0, "ind": 12, "ty": 5, "nm": "Text_Stat_3_Home", "ks": { "o": { "a": 0, "k": 100 }, "p": { "a": 0, "k": [135, 420, 0] } }, "ao": 0, "text": { "document": { "k": [{ "s": { "s": 20, "f": "Arial", "t": "0", "j": 1, "fc": [1, 1, 1], "tr": 140 } }] } }, "ip": 0, "op": 60, "st": 0, "bm": 0 },
    { "ddd": 0, "ind": 13, "ty": 5, "nm": "Text_Stat_3_Away", "ks": { "o": { "a": 0, "k": 100 }, "p": { "a": 0, "k": [405, 420, 0] } }, "ao": 0, "text": { "document": { "k": [{ "s": { "s": 20, "f": "Arial", "t": "0", "j": 1, "fc": [1, 1, 1], "tr": 140 } }] } }, "ip": 0, "op": 60, "st": 0, "bm": 0 },
    { "ddd": 0, "ind": 14, "ty": 5, "nm": "Text_Label_4", "ks": { "o": { "a": 0, "k": 100 }, "p": { "a": 0, "k": [270, 460, 0] } }, "ao": 0, "text": { "document": { "k": [{ "s": { "s": 16, "f": "Arial", "t": "WIN RATE", "j": 1, "fc": [1, 1, 1], "tr": 40 } }] } }, "ip": 0, "op": 60, "st": 0, "bm": 0 },
    { "ddd": 0, "ind": 15, "ty": 5, "nm": "Text_Stat_4_Home", "ks": { "o": { "a": 0, "k": 100 }, "p": { "a": 0, "k": [135, 460, 0] } }, "ao": 0, "text": { "document": { "k": [{ "s": { "s": 20, "f": "Arial", "t": "0", "j": 1, "fc": [1, 1, 1], "tr": 140 } }] } }, "ip": 0, "op": 60, "st": 0, "bm": 0 },
    { "ddd": 0, "ind": 16, "ty": 5, "nm": "Text_Stat_4_Away", "ks": { "o": { "a": 0, "k": 100 }, "p": { "a": 0, "k": [405, 460, 0] } }, "ao": 0, "text": { "document": { "k": [{ "s": { "s": 20, "f": "Arial", "t": "0", "j": 1, "fc": [1, 1, 1], "tr": 140 } }] } }, "ip": 0, "op": 60, "st": 0, "bm": 0 },
    { "ddd": 0, "ind": 17, "ty": 5, "nm": "Text_Label_5", "ks": { "o": { "a": 0, "k": 100 }, "p": { "a": 0, "k": [270, 500, 0] } }, "ao": 0, "text": { "document": { "k": [{ "s": { "s": 16, "f": "Arial", "t": "GOALS SCORED", "j": 1, "fc": [1, 1, 1], "tr": 40 } }] } }, "ip": 0, "op": 60, "st": 0, "bm": 0 },
    { "ddd": 0, "ind": 18, "ty": 5, "nm": "Text_Stat_5_Home", "ks": { "o": { "a": 0, "k": 100 }, "p": { "a": 0, "k": [135, 500, 0] } }, "ao": 0, "text": { "document": { "k": [{ "s": { "s": 20, "f": "Arial", "t": "0", "j": 1, "fc": [1, 1, 1], "tr": 140 } }] } }, "ip": 0, "op": 60, "st": 0, "bm": 0 },
    { "ddd": 0, "ind": 19, "ty": 5, "nm": "Text_Stat_5_Away", "ks": { "o": { "a": 0, "k": 100 }, "p": { "a": 0, "k": [405, 500, 0] } }, "ao": 0, "text": { "document": { "k": [{ "s": { "s": 20, "f": "Arial", "t": "0", "j": 1, "fc": [1, 1, 1], "tr": 140 } }] } }, "ip": 0, "op": 60, "st": 0, "bm": 0 },
    { "ddd": 0, "ind": 20, "ty": 5, "nm": "Text_Label_6", "ks": { "o": { "a": 0, "k": 100 }, "p": { "a": 0, "k": [270, 540, 0] } }, "ao": 0, "text": { "document": { "k": [{ "s": { "s": 16, "f": "Arial", "t": "GOALS CONCEDED", "j": 1, "fc": [1, 1, 1], "tr": 40 } }] } }, "ip": 0, "op": 60, "st": 0, "bm": 0 },
    { "ddd": 0, "ind": 21, "ty": 5, "nm": "Text_Stat_6_Home", "ks": { "o": { "a": 0, "k": 100 }, "p": { "a": 0, "k": [135, 540, 0] } }, "ao": 0, "text": { "document": { "k": [{ "s": { "s": 20, "f": "Arial", "t": "0", "j": 1, "fc": [1, 1, 1], "tr": 140 } }] } }, "ip": 0, "op": 60, "st": 0, "bm": 0 },
    { "ddd": 0, "ind": 22, "ty": 5, "nm": "Text_Stat_6_Away", "ks": { "o": { "a": 0, "k": 100 }, "p": { "a": 0, "k": [405, 540, 0] } }, "ao": 0, "text": { "document": { "k": [{ "s": { "s": 20, "f": "Arial", "t": "0", "j": 1, "fc": [1, 1, 1], "tr": 140 } }] } }, "ip": 0, "op": 60, "st": 0, "bm": 0 },
    { "ddd": 0, "ind": 23, "ty": 5, "nm": "Text_Label_7", "ks": { "o": { "a": 0, "k": 100 }, "p": { "a": 0, "k": [270, 580, 0] } }, "ao": 0, "text": { "document": { "k": [{ "s": { "s": 16, "f": "Arial", "t": "GOAL DIFFERENCE", "j": 1, "fc": [1, 1, 1], "tr": 40 } }] } }, "ip": 0, "op": 60, "st": 0, "bm": 0 },
    { "ddd": 0, "ind": 24, "ty": 5, "nm": "Text_Stat_7_Home", "ks": { "o": { "a": 0, "k": 100 }, "p": { "a": 0, "k": [135, 580, 0] } }, "ao": 0, "text": { "document": { "k": [{ "s": { "s": 20, "f": "Arial", "t": "0", "j": 1, "fc": [1, 1, 1], "tr": 140 } }] } }, "ip": 0, "op": 60, "st": 0, "bm": 0 },
    { "ddd": 0, "ind": 25, "ty": 5, "nm": "Text_Stat_7_Away", "ks": { "o": { "a": 0, "k": 100 }, "p": { "a": 0, "k": [405, 580, 0] } }, "ao": 0, "text": { "document": { "k": [{ "s": { "s": 20, "f": "Arial", "t": "0", "j": 1, "fc": [1, 1, 1], "tr": 140 } }] } }, "ip": 0, "op": 60, "st": 0, "bm": 0 }
  ]
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  @ViewChild('templateContainer') templateContainer!: ElementRef;

  teams: any[] = [];
  loading = true;

  homeTeam: any = null;
  awayTeam: any = null;

  private animItem: any = null;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.http.get<any>(`${environment.apiUrl}/api/matchup/teams`).subscribe({
      next: (res: any) => {
        const tableEntries = res?.standings?.[0]?.table || [];

        const mappedTeams = tableEntries.map((entry: any) => {
          const played = entry.playedGames || 1;
          const rawForm = entry.form || '';
          
          const formArray = rawForm.includes(',') 
            ? rawForm.split(',') 
            : rawForm.split('');

          const rawName = entry.team?.name || entry.team?.shortName || '';
          const cleanName = rawName.replace(/\b(FC|AFC|F\.C\.)\b/gi, '').trim();

          const isSpurs = entry.team?.id === 73 || cleanName.toLowerCase().includes('tottenham');

          return {
            id: entry.team?.id,
            name: cleanName,
            code: (entry.team?.tla || entry.team?.shortName || cleanName.substring(0, 3)).toUpperCase(),
            crest: isSpurs 
              ? 'tottenham-white.png' 
              : entry.team?.crest,
            position: entry.position,
            points: entry.points,
            played: played,
            won: entry.won,
            drawn: entry.draw,
            lost: entry.lost,
            goalsFor: entry.goalsFor,
            goalsAgainst: entry.goalsAgainst,
            goalDifference: entry.goalDifference,
            ppgNum: entry.points / played,
            winRateNum: Math.round((entry.won / played) * 100),
            ppg: (entry.points / played).toFixed(2),
            winRate: Math.round((entry.won / played) * 100) + '%',
            goalsPerGame: (entry.goalsFor / played).toFixed(2),
            form: formArray
          };
        });

        this.teams = mappedTeams.sort((a: any, b: any) => a.name.localeCompare(b.name));
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Error fetching teams', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onHomeSelect(event: Event): void {
    const selectedId = Number((event.target as HTMLSelectElement).value);
    this.homeTeam = this.teams.find((t: any) => t.id === selectedId) || null;
    this.cdr.detectChanges();
    this.initOrUpdateLottie();
  }

  onAwaySelect(event: Event): void {
    const selectedId = Number((event.target as HTMLSelectElement).value);
    this.awayTeam = this.teams.find((t: any) => t.id === selectedId) || null;
    this.cdr.detectChanges();
    this.initOrUpdateLottie();
  }

  private formatGraphicTeamName(fullName: string): string {
    const nameMap: { [key: string]: string } = {
      'Manchester United': 'Man United',
      'Manchester City': 'Man City',
      'Brighton & Hove Albion': 'Brighton',
      'Nottingham Forest': "Nott'm Forest",
      'Tottenham Hotspur': 'Spurs'
    };

    return nameMap[fullName] || fullName;
  }

  private initOrUpdateLottie(): void {
    if (!this.homeTeam || !this.awayTeam) return;

    if (this.animItem) {
      this.animItem.destroy();
      this.animItem = null;
    }

    const animationData = JSON.parse(JSON.stringify(DIRECT_LOTTIE_DATA));

    if (!animationData.w || animationData.w === 0) animationData.w = 540;
    if (!animationData.h || animationData.h === 0) animationData.h = 540;

    if (animationData.assets && animationData.layers) {
      const homeLayer = animationData.layers.find((l: any) => l.nm === 'Image_Crest_Home');
      const awayLayer = animationData.layers.find((l: any) => l.nm === 'Image_Crest_Away');

      if (homeLayer && awayLayer) {
        const homeRefId = homeLayer.refId;
        let awayRefId = awayLayer.refId;

        if (homeRefId === awayRefId) {
          const originalAsset = animationData.assets.find((a: any) => a.id === homeRefId);
          if (originalAsset) {
            const clonedAsset = JSON.parse(JSON.stringify(originalAsset));
            clonedAsset.id = 'image_crest_away_unique';
            awayLayer.refId = clonedAsset.id;
            awayRefId = clonedAsset.id;
            animationData.assets.push(clonedAsset);
          }
        }

        animationData.assets.forEach((asset: any) => {
          if (asset.id === homeRefId || asset.id === awayRefId) {
            asset.p = '';
            asset.u = '';
            asset.e = 0;
          }
        });
      }
    }

    setTimeout(() => {
      const containerEl = this.templateContainer?.nativeElement || document.getElementById('lottie-container');
      if (!containerEl) {
        console.error('Lottie container element not found!');
        return;
      }

      try {
        this.animItem = lottieEngine.loadAnimation({
          container: containerEl,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: animationData
        });

        this.animItem.addEventListener('DOMLoaded', () => {
          this.updateDynamicTextLayers();
          this.applyStatHighlighting();
        });
      } catch (e) {
        console.error('Lottie load error exception:', e);
      }
    }, 50);
  }

  private updateDynamicTextLayers(): void {
    if (!this.animItem || !this.homeTeam || !this.awayTeam) return;

    const updateText = (layerName: string, textValue: string, trackingValue: number = 40) => {
      const upperValue = String(textValue).toUpperCase();

      if (this.animItem.renderer && this.animItem.renderer.elements) {
        const findAndSetText = (elements: any[]) => {
          for (const el of elements) {
            if (el.data && el.data.nm === layerName) {
              if (el.updateDocumentData) {
                el.updateDocumentData({ t: upperValue, tr: trackingValue }, 0);
              }
              return true;
            }
            if (el.elements && el.elements.length > 0) {
              if (findAndSetText(el.elements)) return true;
            }
          }
          return false;
        };

        findAndSetText(this.animItem.renderer.elements);
      }
    };

    updateText('Text_Team_Home', this.formatGraphicTeamName(this.homeTeam.name), 40);
    updateText('Text_Team_Away', this.formatGraphicTeamName(this.awayTeam.name), 40);

    const statsMap = [
      { label: 'LEAGUE POSITION', homeStr: String(this.homeTeam.position), awayStr: String(this.awayTeam.position) },
      { label: 'TOTAL POINTS', homeStr: String(this.homeTeam.points), awayStr: String(this.awayTeam.points) },
      { label: 'POINTS PER GAME', homeStr: String(this.homeTeam.ppg), awayStr: String(this.awayTeam.ppg) },
      { label: 'WIN RATE', homeStr: String(this.homeTeam.winRate), awayStr: String(this.awayTeam.winRate) },
      { label: 'GOALS SCORED', homeStr: String(this.homeTeam.goalsFor), awayStr: String(this.awayTeam.goalsFor) },
      { label: 'GOALS CONCEDED', homeStr: String(this.homeTeam.goalsAgainst), awayStr: String(this.awayTeam.goalsAgainst) },
      { label: 'GOAL DIFFERENCE', homeStr: `${this.homeTeam.goalDifference > 0 ? '+' : ''}${this.homeTeam.goalDifference}`, awayStr: `${this.awayTeam.goalDifference > 0 ? '+' : ''}${this.awayTeam.goalDifference}` }
    ];

    statsMap.forEach((stat, index) => {
      const rowNum = index + 1;
      updateText(`Text_Label_${rowNum}`, stat.label, 40);
      updateText(`Text_Stat_${rowNum}_Home`, stat.homeStr, 140);
      updateText(`Text_Stat_${rowNum}_Away`, stat.awayStr, 140);
    });
  }

  private applyStatHighlighting(): void {
    if (!this.templateContainer || !this.homeTeam || !this.awayTeam) return;

    const rootEl = this.templateContainer.nativeElement as HTMLElement;

    const statsConfig = [
      { row: 1, homeVal: this.homeTeam.position, awayVal: this.awayTeam.position, lowerIsBetter: true },
      { row: 2, homeVal: this.homeTeam.points, awayVal: this.awayTeam.points, lowerIsBetter: false },
      { row: 3, homeVal: Number(this.homeTeam.ppg), awayVal: Number(this.awayTeam.ppg), lowerIsBetter: false },
      { row: 4, homeVal: this.homeTeam.winRateNum, awayVal: this.awayTeam.winRateNum, lowerIsBetter: false },
      { row: 5, homeVal: this.homeTeam.goalsFor, awayVal: this.awayTeam.goalsFor, lowerIsBetter: false },
      { row: 6, homeVal: this.homeTeam.goalsAgainst, awayVal: this.awayTeam.goalsAgainst, lowerIsBetter: true },
      { row: 7, homeVal: this.homeTeam.goalDifference, awayVal: this.awayTeam.goalDifference, lowerIsBetter: false }
    ];

    statsConfig.forEach((cfg) => {
      const homeWins = this.isWinningStat(cfg.homeVal, cfg.awayVal, cfg.lowerIsBetter);
      const awayWins = this.isWinningStat(cfg.awayVal, cfg.homeVal, cfg.lowerIsBetter);

      this.highlightTextElement(rootEl, `Text_Stat_${cfg.row}_Home`, homeWins);
      this.highlightTextElement(rootEl, `Text_Stat_${cfg.row}_Away`, awayWins);
    });
  }

  private highlightTextElement(rootEl: HTMLElement, layerName: string, isWinning: boolean): void {
    if (!this.animItem?.renderer?.elements) return;

    const findAndStyle = (elements: any[]) => {
      for (const el of elements) {
        if (el.data && el.data.nm === layerName) {
          if (el.layerElement) {
            const layerNode = el.layerElement as HTMLElement;
            
            layerNode.style.opacity = isWinning ? '1' : '0.35';
            
            const textNodes = layerNode.querySelectorAll('text, tspan');
            textNodes.forEach((node: Element) => {
              node.setAttribute('fill', isWinning ? '#ffffff' : '#94a3b8');
              (node as HTMLElement).style.opacity = isWinning ? '1' : '0.35';
            });
          }
          return true;
        }
        if (el.elements && el.elements.length > 0) {
          if (findAndStyle(el.elements)) return true;
        }
      }
      return false;
    };

    findAndStyle(this.animItem.renderer.elements);
  }

  isWinningStat(val1: number, val2: number, lowerIsBetter: boolean = false): boolean {
    if (val1 == null || val2 == null) return false;
    if (val1 === val2) return true;
    return lowerIsBetter ? val1 < val2 : val1 > val2;
  }
}