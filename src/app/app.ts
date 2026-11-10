import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import lottie from 'lottie-web';

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
  private lottieRawJson: any = null;

  private readonly teamTracking = 80;
  private readonly statTracking = 120;

  private readonly localApiUrl = 'http://localhost:5245/api/matchup/teams';
  private readonly prodApiUrl = 'https://h2h-backend-api.onrender.com/api/matchup/teams';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.http.get(`h2h-graphic.json?v=${Date.now()}`).subscribe({
      next: (json: any) => {
        this.lottieRawJson = json;
        if (this.homeTeam && this.awayTeam) {
          this.initOrUpdateLottie();
        }
      },
      error: (err) => console.error('Failed to load raw Lottie JSON', err)
    });

    const isLocal =
      typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

    const primaryUrl = isLocal ? this.localApiUrl : this.prodApiUrl;
    const fallbackUrl = isLocal ? this.prodApiUrl : this.localApiUrl;

    this.fetchStandings(primaryUrl, fallbackUrl);
  }

  private fetchStandings(url: string, fallbackUrl?: string): void {
    this.http.get<any>(url).subscribe({
      next: (res: any) => {
        const tableEntries = res?.standings?.[0]?.table || [];
        const mappedTeams = tableEntries.map((entry: any) => {
          const played = entry.playedGames || 1;
          const rawForm = entry.form || '';
          const formArray = rawForm.includes(',') ? rawForm.split(',') : rawForm.split('');
          const rawName = entry.team?.name || entry.team?.shortName || '';
          const cleanName = rawName.replace(/\b(FC|AFC|F\.C\.)\b/gi, '').trim();

          const isSpurs =
            entry.team?.id === 73 ||
            cleanName.toLowerCase().includes('tottenham') ||
            rawName.toLowerCase().includes('tottenham');

          const ppgFixed = (entry.points / played).toFixed(2);
          const winRateRounded = Math.round((entry.won / played) * 100);

          return {
            id: entry.team?.id,
            name: cleanName,
            code: (entry.team?.tla || entry.team?.shortName || cleanName.substring(0, 3)).toUpperCase(),
            crest: isSpurs ? '/tottenham-white.png' : entry.team?.crest,
            position: entry.position,
            points: entry.points,
            played: played,
            won: entry.won,
            drawn: entry.draw,
            lost: entry.lost,
            goalsFor: entry.goalsFor,
            goalsAgainst: entry.goalsAgainst,
            goalDifference: entry.goalDifference,
            ppgNum: Number(ppgFixed),
            winRateNum: winRateRounded,
            ppg: ppgFixed,
            winRate: winRateRounded + '%',
            goalsPerGame: (entry.goalsFor / played).toFixed(2),
            form: formArray
          };
        });

        this.teams = mappedTeams.sort((a: any, b: any) => a.name.localeCompare(b.name));
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        if (fallbackUrl) {
          console.warn(`Primary API (${url}) unreachable, trying fallback (${fallbackUrl})...`);
          this.fetchStandings(fallbackUrl);
          return;
        }
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

  private getStatsMap() {
    return [
      { label: 'LEAGUE POSITION', homeStr: String(this.homeTeam.position), awayStr: String(this.awayTeam.position) },
      { label: 'TOTAL POINTS', homeStr: String(this.homeTeam.points), awayStr: String(this.awayTeam.points) },
      { label: 'POINTS PER GAME', homeStr: String(this.homeTeam.ppg), awayStr: String(this.awayTeam.ppg) },
      { label: 'WIN RATE', homeStr: String(this.homeTeam.winRate), awayStr: String(this.awayTeam.winRate) },
      { label: 'GOALS SCORED', homeStr: String(this.homeTeam.goalsFor), awayStr: String(this.awayTeam.goalsFor) },
      { label: 'GOALS CONCEDED', homeStr: String(this.homeTeam.goalsAgainst), awayStr: String(this.awayTeam.goalsAgainst) },
      {
        label: 'GOAL DIFFERENCE',
        homeStr: `${this.homeTeam.goalDifference > 0 ? '+' : ''}${this.homeTeam.goalDifference}`,
        awayStr: `${this.awayTeam.goalDifference > 0 ? '+' : ''}${this.awayTeam.goalDifference}`
      }
    ];
  }

  private resolveCrestUrl(team: any): string {
    if (!team) return '';
    const isSpurs = team.id === 73 || String(team.name || '').toLowerCase().includes('tottenham');
    return isSpurs ? '/tottenham-white.png' : team.crest;
  }

  private initOrUpdateLottie(): void {
    if (!this.homeTeam || !this.awayTeam || !this.lottieRawJson) return;

    if (this.animItem) {
      this.animItem.destroy();
      this.animItem = null;
    }

    const animationData = JSON.parse(JSON.stringify(this.lottieRawJson));

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

        const homeCrestUrl = this.resolveCrestUrl(this.homeTeam);
        const awayCrestUrl = this.resolveCrestUrl(this.awayTeam);

        animationData.assets.forEach((asset: any) => {
          if (asset && asset.id === homeRefId) {
            asset.p = homeCrestUrl;
            asset.u = '';
            asset.e = 1;
          } else if (asset && asset.id === awayRefId) {
            asset.p = awayCrestUrl;
            asset.u = '';
            asset.e = 1;
          }
        });
      }

      const setJsonLayerText = (layerName: string, value: string, tracking?: number) => {
        const layer = animationData.layers.find((l: any) => l.nm === layerName);
        if (layer?.t?.d?.k?.[0]?.s) {
          layer.t.d.k[0].s.t = String(value).toUpperCase();
          if (tracking !== undefined) {
            layer.t.d.k[0].s.tr = tracking;
          }
        }
      };

      setJsonLayerText('Text_Team_Home', this.homeTeam.name, this.teamTracking);
      setJsonLayerText('Text_Team_Away', this.awayTeam.name, this.teamTracking);

      this.getStatsMap().forEach((stat, index) => {
        const rowNum = index + 1;
        setJsonLayerText(`Text_Label_${rowNum}`, stat.label);
        setJsonLayerText(`Text_Stat_${rowNum}_Home`, stat.homeStr, this.statTracking);
        setJsonLayerText(`Text_Stat_${rowNum}_Away`, stat.awayStr, this.statTracking);
      });
    }

    setTimeout(() => {
      if (!this.templateContainer) return;

      this.animItem = lottie.loadAnimation({
        container: this.templateContainer.nativeElement,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationData
      });

      this.animItem.addEventListener('DOMLoaded', () => {
        this.updateDynamicTextLayers();
        this.applyStatHighlighting();
      });
    }, 50);
  }

  private updateDynamicTextLayers(): void {
    if (!this.animItem || !this.homeTeam || !this.awayTeam) return;

    const updateText = (layerName: string, textValue: string, tracking?: number) => {
      const upperValue = String(textValue).toUpperCase();
      if (this.animItem.renderer && this.animItem.renderer.elements) {
        const findAndSetText = (elements: any[]) => {
          for (const el of elements) {
            if (el.data && el.data.nm === layerName) {
              try {
                if (el.updateDocumentData) {
                  const payload: any = { t: upperValue };
                  if (tracking !== undefined) {
                    payload.tr = tracking;
                  }
                  el.updateDocumentData(payload, 0);
                }
              } catch (err) {
                if (el.layerElement) {
                  const tNode = el.layerElement.querySelector('text, tspan');
                  if (tNode) tNode.textContent = upperValue;
                }
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

    updateText('Text_Team_Home', this.homeTeam.name, this.teamTracking);
    updateText('Text_Team_Away', this.awayTeam.name, this.teamTracking);

    this.getStatsMap().forEach((stat, index) => {
      const rowNum = index + 1;
      updateText(`Text_Label_${rowNum}`, stat.label);
      updateText(`Text_Stat_${rowNum}_Home`, stat.homeStr, this.statTracking);
      updateText(`Text_Stat_${rowNum}_Away`, stat.awayStr, this.statTracking);
    });
  }

  private applyStatHighlighting(): void {
    if (!this.templateContainer || !this.homeTeam || !this.awayTeam) return;
    const rootEl = this.templateContainer.nativeElement as HTMLElement;

    const statsConfig = [
      { row: 1, homeVal: this.homeTeam.position, awayVal: this.awayTeam.position, lowerIsBetter: true },
      { row: 2, homeVal: this.homeTeam.points, awayVal: this.awayTeam.points, lowerIsBetter: false },
      { row: 3, homeVal: this.homeTeam.ppgNum, awayVal: this.awayTeam.ppgNum, lowerIsBetter: false },
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
            layerNode.setAttribute('opacity', isWinning ? '1' : '0.35');
            const childNodes = layerNode.querySelectorAll('text, tspan, path');
            childNodes.forEach((node: any) => {
              node.setAttribute('fill', isWinning ? '#ffffff' : '#94a3b8');
              node.style.opacity = isWinning ? '1' : '0.35';
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
    const n1 = Number(val1);
    const n2 = Number(val2);
    if (n1 === n2) return true;
    return lowerIsBetter ? n1 < n2 : n1 > n2;
  }
}