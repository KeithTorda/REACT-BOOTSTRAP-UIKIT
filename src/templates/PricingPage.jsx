import { useState } from 'react';
import { ContentWrapper } from '../components/layout';
import { PricingCard } from '../components/display';
import { ToggleGroup } from '../components/buttons';
import { Accordion } from '../components/navigation';
import { plans } from '../data/sampleAppData';

/** TEMPLATE — Plan / pricing page with a billing toggle and FAQ. */
export default function PricingPage() {
  const [cycle, setCycle] = useState('Monthly');

  return (
    <ContentWrapper title="Plans" subtitle="Choose the plan that fits your team" breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Plans' }]}>
      <div className="text-center mb-4">
        <ToggleGroup options={['Monthly', 'Yearly']} value={cycle} onChange={setCycle} />
        {cycle === 'Yearly' && <div className="uikit-helper mt-2">Two months free on annual billing</div>}
      </div>

      <div className="row g-3 justify-content-center">
        {plans.map((plan) => (
          <div className="col-md-6 col-xl-4" key={plan.name}>
            <PricingCard {...plan} period={cycle === 'Yearly' ? '/year' : '/month'} />
          </div>
        ))}
      </div>

      <div className="row justify-content-center mt-4">
        <div className="col-xl-8">
          <h5 className="mb-3">Frequently asked</h5>
          <Accordion
            defaultOpenKeys={['a']}
            items={[
              { key: 'a', title: 'Can I change plans later?', icon: 'arrow-left-right', content: 'Yes — upgrades apply immediately and downgrades at the end of the cycle.' },
              { key: 'b', title: 'Is there a free trial?', icon: 'clock', content: 'The Starter plan is free indefinitely for small workspaces.' },
              { key: 'c', title: 'How is billing handled?', icon: 'credit-card', content: 'Monthly or annually, with an invoice issued each cycle.' },
            ]}
          />
        </div>
      </div>
    </ContentWrapper>
  );
}
