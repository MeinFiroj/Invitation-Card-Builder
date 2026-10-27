import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { useInvitation } from '@/context/InvitationContext';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { templates } from '@/data/templates';
import { readSharedCard } from '@/utils/share';
import InvitationPreview from '@/components/InvitationPreview';

export default function InvitationPage() {
  const [params] = useSearchParams();
  const { template, data } = useInvitation();
  useSmoothScroll();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // A shared link (?d=...) carries the whole card. Otherwise fall back to the editor's data.
  const shared = useMemo(() => readSharedCard(params.get('d')), [params]);
  const active =
    shared?.template ?? templates.find((t) => t.id === params.get('template')) ?? template;

  return <InvitationPreview template={active} data={shared?.data ?? data} />;
}