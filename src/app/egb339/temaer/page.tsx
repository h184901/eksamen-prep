import Link from "next/link";
import { getEgb339ConceptsByTrack, getEgb339En } from "@/lib/egb339-vault/loader";
import { EGB339_TRACKS, egb339DisplaySummary, egb339DisplayTitle } from "@/lib/egb339";
import { EGB339_ARCHIVED_TOPICS, EGB339_COURSE_ORDER } from "@/lib/egb339-course";
import { egb339Title } from "@/lib/egb339-titles";
import { EGB339_UI, ui } from "@/lib/egb339-language/ui";
import { T } from "@/components/egb339/T";
import LangBlock from "@/components/egb339/LangBlock";
import TopicIndexList, { type TopicIndexTrack } from "@/components/egb339/TopicIndexList";
import { EGB339_TRACK_LABEL_KEY } from "@/lib/egb339-track-labels";

function trackNav(lang: "no" | "en") {
  return <nav aria-label={ui(lang, "indexTracksAria")}>{EGB339_TRACKS.map((track) => <a key={track.id} href={"#" + track.id}>{ui(lang, EGB339_TRACK_LABEL_KEY[track.id])}</a>)}</nav>;
}

export default function Egb339TopicsPage() {
  const order: readonly string[] = EGB339_COURSE_ORDER.flatMap((week) => [...week.topics]);
  const tracks: TopicIndexTrack[] = EGB339_TRACKS.map((track) => ({
    id: track.id,
    entries: getEgb339ConceptsByTrack(track.id).sort((a, b) => (order.indexOf(a.slug) < 0 ? 999 : order.indexOf(a.slug)) - (order.indexOf(b.slug) < 0 ? 999 : order.indexOf(b.slug))).map((entry) => {
      const en = getEgb339En(entry.slug);
      const week = EGB339_COURSE_ORDER.find((row) => (row.topics as readonly string[]).includes(entry.slug))?.week;
      const archived = (EGB339_ARCHIVED_TOPICS as readonly string[]).includes(entry.slug);
      const metaNo = archived ? ui("no", "archivedNote") : week != null ? ui("no", "weekOf") + " " + week : ui("no", "referenceNote");
      const metaEn = archived ? ui("en", "archivedNote") : week != null ? ui("en", "weekOf") + " " + week : ui("en", "referenceNote");
      return {
        slug: entry.slug,
        route: entry.route,
        pageKey: "egb339/tema/" + entry.slug,
        titleNo: egb339Title(entry.slug, "no") ?? egb339DisplayTitle(entry),
        titleEn: egb339Title(entry.slug, "en") ?? egb339DisplayTitle(entry),
        summaryNo: egb339DisplaySummary(entry),
        summaryEn: en?.summary ?? egb339DisplaySummary(entry),
        metaNo,
        metaEn,
      };
    }),
  }));
  return <article className="egb-pilot-article egb-pilot-prose">
    <header className="egb-pilot-lesson-header">
      <h1><T no={EGB339_UI.indexPageTitle.no} en={EGB339_UI.indexPageTitle.en} /></h1>
      <p><LangBlock
        no={<>{EGB339_UI.indexPageIntro1.no}{" "}<Link href="/egb339">{EGB339_UI.indexPageIntro2.no}</Link>{" "}{EGB339_UI.indexPageIntro3.no}</>}
        en={<>{EGB339_UI.indexPageIntro1.en}{" "}<Link href="/egb339">{EGB339_UI.indexPageIntro2.en}</Link>{" "}{EGB339_UI.indexPageIntro3.en}</>}
      /></p>
      <LangBlock no={trackNav("no")} en={trackNav("en")} />
    </header>
    <TopicIndexList tracks={tracks} />
  </article>;
}