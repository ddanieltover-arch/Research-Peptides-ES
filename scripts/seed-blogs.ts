import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const blogPosts = [
  {
    id: "bpc-157-comprehensive-guide",
    title: "What is BPC-157? A Comprehensive Guide for Researchers",
    image_url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=2940",
    content: `BPC-157 (Body Protection Compound-157) is a synthetic pentadecapeptide composed of 15 amino acids, isolated from human gastric juice. In laboratory research, it is primarily studied for its potential to promote angiogenesis, upregulate growth hormone receptors, and accelerate tissue healing in in vitro and animal models.

## The Molecular Structure of BPC-157
The chemical composition of BPC-157 is C62H98N16O22. It is important to note that this compound is intended strictly for research purposes and in vitro laboratory workflows, not for human consumption.

## Arginate vs. Acetate Salts: Which is more stable?
Recent studies have highlighted the differences between the arginate and acetate versions of BPC-157. The arginate salt has shown significantly improved stability in gastric juice models, making it a preferred choice for certain oral administration simulations in animal subjects.

## Mechanisms of Action in Cellular Studies
BPC-157 promotes angiogenesis by upregulating VEGFR2 and enhancing the migration of endothelial cells. This accelerated blood vessel formation is believed to be the primary mechanism by which it accelerates the repair of tendon, muscle, and nervous tissues in controlled studies.

## Proper Lyophilized Storage and Reconstitution
To maintain its structural integrity, lyophilized BPC-157 should be stored at -20°C. Upon reconstitution with bacteriostatic water, it must be kept refrigerated at 2-8°C and used within its stable window.

Browse our 99% purity, third-party tested BPC-157 for your next study.`,
    created_at: new Date().toISOString(),
  },
  {
    id: "reconstitute-research-peptides",
    title: "How to Properly Reconstitute Research Peptides",
    image_url: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=2940",
    content: `To reconstitute a research peptide, swab the vial stopper with alcohol, inject the required volume of bacteriostatic water slowly against the glass wall to prevent foam, and gently swirl the vial until dissolved. Never shake the vial, as this can damage the fragile peptide chains.

## Necessary Equipment for Reconstitution
For standard laboratory workflows, you will require:
- Lyophilized peptide vial
- Bacteriostatic water (BAC water)
- Sterile syringes (e.g., 1ml or 3ml)
- Alcohol prep pads

## Step-by-Step Guide to Mixing Lyophilized Peptides
1. Remove the protective caps from both the peptide vial and the BAC water.
2. Swab both stoppers with an alcohol pad.
3. Draw the exact amount of BAC water required for your concentration.
4. Pierce the peptide vial and aim the needle at the glass wall. Slowly expel the water.
5. Gently swirl the vial in a circular motion until the powder is fully dissolved. Do not shake.

## Bacteriostatic Water vs. Sterile Water
Bacteriostatic water contains 0.9% benzyl alcohol, which inhibits the growth of bacteria, allowing the vial to be used multiple times over several weeks. Sterile water does not contain a preservative and should only be used for single-use applications.

## Calculating Dosage and Concentrations
If you add 2ml of BAC water to a 10mg vial of peptide, the resulting concentration is 5mg per ml (or 5000mcg per ml). 
Use our free Peptide Calculator to ensure accurate laboratory dosing.`,
    created_at: new Date().toISOString(),
  },
  {
    id: "tb-500-vs-bpc-157-synergistic-effects",
    title: "TB-500 vs BPC-157: Synergistic Effects in Animal Models",
    image_url: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=2940",
    content: `While BPC-157 focuses on upregulating growth hormone receptors and promoting angiogenesis for tendon/ligament repair, TB-500 (Thymosin Beta-4) actively regulates cellular actin, enabling cell migration and flexibility. In research models, the two are frequently studied together to observe synergistic effects on comprehensive tissue healing.

## What is TB-500 (Thymosin Beta-4)?
TB-500 is a synthetic version of the naturally occurring peptide Thymosin Beta-4. It plays a vital role in building new blood vessels, new small muscle tissue fibers, cell migration, and blood cell reproduction.

## Comparing Mechanisms: Angiogenesis vs Actin Regulation
BPC-157's primary mechanism revolves around angiogenesis (the formation of new blood vessels) and the upregulation of growth hormone receptors. In contrast, TB-500 binds to actin—a cellular protein essential for muscle contraction and cell movement. This binding allows for rapid cell migration to sites of injury in experimental models.

## Synergistic Research Applications
Because they operate via different yet complementary biological pathways, researchers frequently apply both peptides simultaneously in animal models to observe combined efficacy on severe musculoskeletal injuries.

## Solubility and Co-Reconstitution Practices
In laboratory settings, researchers may reconstitute these peptides separately or utilize pre-formulated blends to ensure accurate dosing and maintain the stability of both compounds in solution.

Explore our BPC-157/TB-500 research blends to streamline your laboratory workflows.`,
    created_at: new Date().toISOString(),
  }
];

async function seed() {
  for (const post of blogPosts) {
    const { data, error } = await supabase
      .from('blog_posts')
      .upsert(post, { onConflict: 'id' });
    
    if (error) {
      console.error("Error inserting post:", error.message);
    } else {
      console.log(`Successfully seeded post: ${post.title}`);
    }
  }
}

seed();
