def solve_buck(Vin, Vout, f, R, L, C):
    D = Vout / Vin

    delta_iL = (Vin - Vout) * D / (f * L)

    I_avg = Vout / R

    I_peak = I_avg + delta_iL / 2
    I_trough = I_avg - delta_iL / 2

    delta_Vc = delta_iL / (8 * f * C)

    mode = "CCM" if I_trough > 0 else "DCM"

    L_min = (Vin - Vout) * D * R / (2 * f * Vout)

    return {
        "duty_cycle": round(D, 4),
        "delta_iL": round(delta_iL, 4),
        "I_avg": round(I_avg, 4),
        "I_peak": round(I_peak, 4),
        "I_trough": round(I_trough, 4),
        "delta_Vc": round(delta_Vc, 6),
        "mode": mode,
        "L_min_for_CCM": round(L_min, 6),
    }


def generate_waveforms(Vin, Vout, f, R, L, C, num_cycles=5):
    D = Vout / Vin
    T = 1 / f
    dt = T / 200

    I_avg = Vout / R
    delta_iL = (Vin - Vout) * D / (f * L)
    I_trough = I_avg - delta_iL / 2

    times = []
    iL_values = []
    vC_values = []

    iL = I_trough
    vC = Vout - (Vin - Vout) * D / (8 * f * f * L * C)

    t = 0
    while t < num_cycles * T:
        t_in_cycle = t % T

        if t_in_cycle < D * T:
            v_L = Vin - Vout
        else:
            v_L = -Vout

        iL += (v_L / L) * dt
        i_C = iL - I_avg
        vC += (i_C / C) * dt

        times.append(round(t * 1000, 6))
        iL_values.append(round(iL, 6))
        vC_values.append(round(vC, 6))

        t += dt

    return times, iL_values, vC_values