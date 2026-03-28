<script lang="ts">
	import { describeScenario } from '$lib/data/scenarios';
	import type { Scenario, ScenarioType } from '$lib/data/types';

	interface Props {
		scenario: Scenario;
	}

	let { scenario }: Props = $props();

	const typeLabels: Record<ScenarioType, string> = {
		rfi: 'Raise First In',
		facing_raise: 'Facing a Raise',
		facing_3bet: 'Facing a 3-Bet',
		squeeze: 'Squeeze Spot'
	};

	const typeBadgeColors: Record<ScenarioType, string> = {
		rfi: 'bg-cyan-500/20 text-cyan-300',
		facing_raise: 'bg-amber-500/20 text-amber-300',
		facing_3bet: 'bg-purple-500/20 text-purple-300',
		squeeze: 'bg-pink-500/20 text-pink-300'
	};
</script>

<div class="text-center">
	<span class="inline-block rounded-full px-3 py-1 text-xs font-semibold {typeBadgeColors[scenario.type]}">
		{typeLabels[scenario.type]}
	</span>
	<p class="mt-2 text-lg text-gray-200">{describeScenario(scenario)}</p>
</div>
