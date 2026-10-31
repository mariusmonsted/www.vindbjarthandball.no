// Henter kampene til IL Vindbjart (klubbid 60781) fra handball.no og lagrer dem som data/kamper.json.
// Kjøres hver natt av GitHub Actions. Brukes av kampsenteret på vindbjarthandball.no.
const KLUBB = 60781;
const DAGER = 21;
const UA = { 'User-Agent': 'Vindbjart Handball nettside (kampsenter)', 'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json' };
const iso = d => d.toISOString().slice(0, 10);
const fom = new Date(); const tom = new Date(Date.now() + DAGER * 864e5);

const lag = await (await fetch(`https://www.handball.no/api/AjaxData/SortedTeamsForClubAsCheckboxes?id=${KLUBB}`, { headers: UA })).json();
const ids = lag.filter(l => !l.isBeach).map(l => l.id);
if (!ids.length) throw new Error('Fant ingen lag for klubben – har handball.no endret API-et?');

const q = ids.map(i => `ids=${i}`).join('&');
const r = await fetch(`https://www.handball.no/api/AjaxData/SortedMatchesForClubsOrTeams?fom=${iso(fom)}&tom=${iso(tom)}&${q}`, { headers: UA });
if (!r.ok) throw new Error(`handball.no svarte ${r.status}`);
const data = await r.json();
const kamper = (data.matches || []).filter(m => !m.isReservation).map(m => ({
  dato: m.matchDate.slice(0, 10), tid: m.time, hall: m.placeName,
  hjemme: m.homeTeamName, borte: m.awayTeamName,
  klasse: (m.tournamentName || '').split(',')[0].trim(),
  turnering: m.tournamentName, url: 'https://www.handball.no' + m.matchUrl
}));
const fs = await import('node:fs');
fs.mkdirSync('data', { recursive: true });
fs.writeFileSync('data/kamper.json', JSON.stringify({ oppdatert: new Date().toISOString(), klubb: KLUBB, antall: kamper.length, kamper }, null, 1));
console.log(`Lagret ${kamper.length} kamper fra ${ids.length} lag (${iso(fom)}–${iso(tom)})`);
