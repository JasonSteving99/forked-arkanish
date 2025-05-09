export const ParticleTypes = Object.freeze({
    NULL: 0,
    JET: 1,
    EXPLOSION_RED: 2,
    EXPLOSION_WHITE: 3,
})

export type Particle = {
    type: number,
    variation: number,
    originX: number,
    originY: number,
    originZ: number,
    vecX: number,
    vecY: number,
    vecZ: number,
    startTime: number,
    endTime: number,
}

const NULL_PARTICLE: Particle = Object.freeze({
    type: 0,
    variation: 0,
    originX: 0,
    originY: 0,
    originZ: 0,
    vecX: 0,
    vecY: 0,
    vecZ: 0,
    startTime: 0,
    endTime: 0,
})

export const Particle = {
    create: (): Particle => Object.assign({}, NULL_PARTICLE),
    reset: (particle: Particle) => { Object.assign(particle, NULL_PARTICLE) }
}

export type ParticleState = {
    liveParticles: Particle[],
    deadParticles: Particle[],
}

export const ParticleState = {
    create: (): ParticleState => ({ liveParticles: [], deadParticles: [] }),
    provisionParticle: (state: ParticleState, time: number): Particle => {
        const particle = state.deadParticles.pop() || Particle.create()
        particle.startTime = time
        state.liveParticles.push(particle)
        return particle
    },
    releaseParticle: (state: ParticleState, idx: number) => {
        const part = state.liveParticles[idx]

        state.liveParticles[idx] = state.liveParticles[state.liveParticles.length - 1]
        state.liveParticles.pop()

        Particle.reset(part)
        state.deadParticles.push(part)
    },
}
