import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { COLORS, SHADOW } from '../theme';

// ── Dados mockados ────────────────────────────────────────

const PLANS = [
  {
    id: 1,
    name: 'Básico',
    price: 39.90,
    highlight: false,
    badge: null,
    description: 'Para quem está começando a cuidar do pet',
    color: COLORS.background,
    borderColor: '#e0e0e0',
    textColor: COLORS.text,
    subtextColor: COLORS.textFaint,
    btnBg: COLORS.primary,
    btnText: COLORS.textWhite,
    dividerColor: COLORS.borderLight,
    iconColor: COLORS.primary,
    iconMissColor: '#bbb',
    benefits: [
      '1 consulta veterinária/mês',
      'Desconto 10% no Marketplace',
      'Suporte via chat',
      'Carteira de vacinação digital',
    ],
    missing: [
      'Consultas ilimitadas',
      'Cobertura de emergência',
      'Banho e tosa incluso',
    ],
  },
  {
    id: 2,
    name: 'Essencial',
    price: 79.90,
    highlight: true,
    badge: 'Mais popular',
    description: 'O equilíbrio perfeito entre custo e benefício',
    color: COLORS.primary,
    borderColor: COLORS.primary,
    textColor: COLORS.textWhite,
    subtextColor: 'rgba(255,255,255,0.75)',
    btnBg: COLORS.textWhite,
    btnText: COLORS.primary,
    dividerColor: 'rgba(255,255,255,0.2)',
    iconColor: 'rgba(255,255,255,0.9)',
    iconMissColor: 'rgba(255,255,255,0.35)',
    benefits: [
      '3 consultas veterinárias/mês',
      'Desconto 20% no Marketplace',
      'Suporte prioritário 24h',
      'Carteira de vacinação digital',
      'Cobertura de emergência básica',
      '1 banho e tosa/mês',
    ],
    missing: ['Consultas ilimitadas'],
  },
  {
    id: 3,
    name: 'Premium',
    price: 139.90,
    highlight: false,
    badge: null,
    description: 'Cuidado completo e sem limitações',
    color: COLORS.background,
    borderColor: '#e0e0e0',
    textColor: COLORS.text,
    subtextColor: COLORS.textFaint,
    btnBg: COLORS.primary,
    btnText: COLORS.textWhite,
    dividerColor: COLORS.borderLight,
    iconColor: COLORS.primary,
    iconMissColor: '#bbb',
    benefits: [
      'Consultas veterinárias ilimitadas',
      'Desconto 30% no Marketplace',
      'Suporte prioritário 24h',
      'Carteira de vacinação digital',
      'Cobertura de emergência completa',
      'Banho e tosa ilimitados',
      'Teleconsulta com especialistas',
    ],
    missing: [],
  },
];

const FAQ = [
  {
    q: 'Posso cancelar a qualquer momento?',
    a: 'Sim, você pode cancelar seu plano a qualquer momento sem taxas de cancelamento. O acesso permanece ativo até o fim do período pago.',
  },
  {
    q: 'O plano cobre mais de um pet?',
    a: 'Cada plano é válido para um pet. Para mais de um animal, você pode contratar planos adicionais com 15% de desconto.',
  },
  {
    q: 'Como funciona a cobertura de emergência?',
    a: 'Nossa rede de clínicas parceiras atende emergências 24h. Basta apresentar seu número de assinante na recepção.',
  },
];

// ── Componente ────────────────────────────────────────────

export default function PlanosScreen({ navigate, user }) {
  const [currentPlan] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  function handleSubscribe(plan) {
    Alert.alert(
      `Contratar ${plan.name}`,
      `Assinar o plano ${plan.name} por R$ ${plan.price.toFixed(2).replace('.', ',')}/mês?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: () => Alert.alert('Sucesso!', `Plano ${plan.name} ativado com sucesso! 🐾`),
        },
      ]
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Planos de Saúde</Text>
        <Text style={styles.headerSub}>Escolha o melhor cuidado para o seu pet</Text>
      </View>

      {/* Banner de status */}
      {currentPlan ? (
        <View style={[styles.banner, styles.bannerActive]}>
          <View>
            <Text style={styles.activePlanLabel}>Plano ativo</Text>
            <Text style={styles.activePlanName}>{currentPlan}</Text>
          </View>
          <TouchableOpacity style={styles.managePlanBtn}>
            <Text style={styles.managePlanText}>Gerenciar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={[styles.banner, styles.bannerEmpty]}>
          <Text style={styles.bannerEmoji}>🐾</Text>
          <View style={styles.bannerBody}>
            <Text style={styles.bannerEmptyTitle}>Sem plano ativo</Text>
            <Text style={styles.bannerEmptySub}>Escolha um plano abaixo e proteja seu pet</Text>
          </View>
        </View>
      )}

      {/* Cards de planos */}
      <View style={styles.plansSection}>
        {PLANS.map(plan => (
          <View
            key={plan.id}
            style={[
              styles.planCard,
              plan.highlight ? SHADOW.lg : SHADOW.md,
              { backgroundColor: plan.color, borderColor: plan.borderColor },
            ]}
          >
            {plan.badge && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{plan.badge}</Text>
              </View>
            )}

            <Text style={[styles.planName, { color: plan.textColor }]}>{plan.name}</Text>
            <Text style={[styles.planDesc, { color: plan.subtextColor }]}>{plan.description}</Text>

            <View style={styles.priceRow}>
              <Text style={[styles.priceCurrency, { color: plan.textColor }]}>R$</Text>
              <Text style={[styles.priceValue,    { color: plan.textColor }]}>
                {plan.price.toFixed(2).replace('.', ',')}
              </Text>
              <Text style={[styles.pricePeriod,   { color: plan.subtextColor }]}>/mês</Text>
            </View>

            <View style={[styles.divider, { backgroundColor: plan.dividerColor }]} />

            {plan.benefits.map((b, i) => (
              <View key={i} style={styles.benefitRow}>
                <Text style={[styles.benefitIcon, { color: plan.iconColor }]}>✓</Text>
                <Text style={[styles.benefitText, { color: plan.textColor }]}>{b}</Text>
              </View>
            ))}

            {plan.missing.map((b, i) => (
              <View key={i} style={styles.benefitRow}>
                <Text style={[styles.benefitIcon, { color: plan.iconMissColor }]}>✕</Text>
                <Text style={[styles.benefitText, { color: plan.subtextColor }]}>{b}</Text>
              </View>
            ))}

            <TouchableOpacity
              style={[styles.planBtn, { backgroundColor: plan.btnBg }]}
              onPress={() => handleSubscribe(plan)}
              activeOpacity={0.8}
            >
              <Text style={[styles.planBtnText, { color: plan.btnText }]}>
                Contratar {plan.name}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Garantia */}
      <View style={styles.guaranteeCard}>
        <Text style={styles.guaranteeEmoji}>🛡️</Text>
        <View style={styles.bannerBody}>
          <Text style={styles.guaranteeTitle}>Garantia de 7 dias</Text>
          <Text style={styles.guaranteeSub}>
            Não ficou satisfeito? Cancelamos e devolvemos 100% do valor.
          </Text>
        </View>
      </View>

      {/* FAQ */}
      <View style={styles.faqSection}>
        <Text style={styles.faqTitle}>Dúvidas frequentes</Text>
        {FAQ.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={styles.faqItem}
            onPress={() => setOpenFaq(openFaq === i ? null : i)}
            activeOpacity={0.7}
          >
            <View style={styles.faqHeader}>
              <Text style={styles.faqQuestion}>{item.q}</Text>
              <Text style={styles.faqChevron}>{openFaq === i ? '▲' : '▼'}</Text>
            </View>
            {openFaq === i && (
              <Text style={styles.faqAnswer}>{item.a}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

// ── Estilos ───────────────────────────────────────────────

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // ── Header ──────────────────────────────────────────────
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  headerSub: {
    fontSize: 13,
    color: COLORS.textFaint,
    marginTop: 2,
  },

  // ── Banners (base compartilhada) ─────────────────────────
  banner: {
    margin: 16,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  bannerActive: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primaryBorder,
    justifyContent: 'space-between',
  },
  bannerEmpty: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.borderLight,
    ...SHADOW.sm,
  },
  bannerBody: {
    flex: 1,
    marginLeft: 12,
  },
  bannerEmoji: {
    fontSize: 28,
  },
  bannerEmptyTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 2,
  },
  bannerEmptySub: {
    fontSize: 12,
    color: COLORS.textFaint,
  },
  activePlanLabel: {
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  activePlanName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  managePlanBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  managePlanText: {
    color: COLORS.textWhite,
    fontSize: 13,
    fontWeight: '600',
  },

  // ── Cards de planos ──────────────────────────────────────
  plansSection: {
    paddingHorizontal: 16,
    gap: 14,
  },
  planCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1.5,
  },
  badge: {
    position: 'absolute',
    top: -11,
    alignSelf: 'center',
    backgroundColor: COLORS.accent,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textWhite,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  planName: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
    marginTop: 6,
  },
  planDesc: {
    fontSize: 13,
    marginBottom: 14,
    lineHeight: 18,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
    gap: 2,
  },
  priceCurrency: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  priceValue: {
    fontSize: 34,
    fontWeight: '800',
    lineHeight: 38,
  },
  pricePeriod: {
    fontSize: 14,
    marginBottom: 6,
    marginLeft: 2,
  },
  divider: {
    height: 1,
    marginBottom: 14,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 10,
  },
  benefitIcon: {
    fontSize: 13,
    fontWeight: '700',
    width: 18,
  },
  benefitText: {
    fontSize: 13,
    lineHeight: 18,
    flex: 1,
  },
  planBtn: {
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 16,
  },
  planBtnText: {
    fontSize: 14,
    fontWeight: '700',
  },

  // ── Garantia ─────────────────────────────────────────────
  guaranteeCard: {
    margin: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOW.sm,
  },
  guaranteeEmoji: {
    fontSize: 30,
  },
  guaranteeTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  guaranteeSub: {
    fontSize: 12,
    color: COLORS.textMuted,
    lineHeight: 17,
  },

  // ── FAQ ──────────────────────────────────────────────────
  faqSection: {
    paddingHorizontal: 16,
  },
  faqTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
  },
  faqItem: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
    paddingRight: 8,
    lineHeight: 18,
  },
  faqChevron: {
    fontSize: 10,
    color: COLORS.textDisabled,
  },
  faqAnswer: {
    fontSize: 13,
    color: COLORS.textMuted,
    lineHeight: 19,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },

});