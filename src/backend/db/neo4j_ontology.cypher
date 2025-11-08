// NutraSense AI - Ingredient Ontology Schema (Neo4j)
// Handles synonyms, botanical names, grades, substitutions, and hierarchies

// Create constraints
CREATE CONSTRAINT ingredient_id IF NOT EXISTS FOR (i:Ingredient) REQUIRE i.id IS UNIQUE;
CREATE CONSTRAINT synonym_text IF NOT EXISTS FOR (s:Synonym) REQUIRE s.text IS UNIQUE;
CREATE CONSTRAINT grade_name IF NOT EXISTS FOR (g:Grade) REQUIRE g.name IS UNIQUE;
CREATE CONSTRAINT assay_id IF NOT EXISTS FOR (a:AssayMethod) REQUIRE a.id IS UNIQUE;

// Create indexes
CREATE INDEX ingredient_name IF NOT EXISTS FOR (i:Ingredient) ON (i.name);
CREATE INDEX synonym_normalized IF NOT EXISTS FOR (s:Synonym) ON (s.normalized);
CREATE INDEX botanical_name IF NOT EXISTS FOR (i:Ingredient) ON (i.botanical_name);

// ===== CORE NODE TYPES =====

// Ingredient (primary entity)
// Properties: id, name, botanical_name, cas_number, common_names[], category, description
(:Ingredient {
    id: "ING-CURC-001",
    name: "Curcumin",
    botanical_name: "Curcuma longa",
    cas_number: "458-37-7",
    common_names: ["Turmeric Extract", "Curcumin Extract"],
    category: "Herbal Extract",
    description: "Active compound from turmeric root",
    created_at: datetime()
})

// Synonym (for fuzzy matching)
// Properties: text, normalized, confidence (0-1)
(:Synonym {
    text: "Turmeric 95%",
    normalized: "turmeric",
    confidence: 0.95,
    source: "common_usage"
})

// Grade (quality standards)
// Properties: name, standard_body, description, typical_assay_range
(:Grade {
    name: "USP",
    full_name: "United States Pharmacopeia",
    standard_body: "USP",
    description: "Pharmaceutical grade meeting USP standards",
    typical_assay_min: 95.0,
    typical_assay_max: 105.0
})

// Form (physical form)
// Properties: name, description, typical_applications[]
(:Form {
    name: "Powder",
    description: "Dry powder form",
    typical_applications: ["capsules", "tablets", "blending"]
})

// AssayMethod (testing method)
// Properties: id, name, technique, typical_range, units
(:AssayMethod {
    id: "HPLC-UV-001",
    name: "HPLC-UV",
    technique: "High-Performance Liquid Chromatography with UV Detection",
    typical_range_min: 90.0,
    typical_range_max: 105.0,
    units: "percent"
})

// Certification (required certifications)
// Properties: name, issuing_body, region, description
(:Certification {
    name: "GMP",
    full_name: "Good Manufacturing Practice",
    issuing_body: "FDA",
    region: "USA",
    description: "Quality assurance for pharmaceutical manufacturing"
})

// ===== RELATIONSHIP TYPES =====

// Synonym relationships
(:Ingredient)-[:HAS_SYNONYM {confidence: 0.95}]->(:Synonym)
(:Synonym)-[:REFERS_TO]->(:Ingredient)

// Grade relationships
(:Ingredient)-[:AVAILABLE_IN_GRADE]->(:Grade)
(:Grade)-[:REQUIRES_ASSAY_METHOD]->(:AssayMethod)

// Form relationships
(:Ingredient)-[:AVAILABLE_IN_FORM]->(:Form)

// Substitution (can be used as alternative)
(:Ingredient)-[:CAN_SUBSTITUTE {similarity: 0.85, conditions: "Similar assay"}]->(:Ingredient)

// Hierarchy (parent-child)
(:Ingredient)-[:IS_A]->(:Ingredient) // e.g., Curcumin IS_A Polyphenol

// Certification requirements
(:Grade)-[:REQUIRES_CERTIFICATION]->(:Certification)

// ===== SAMPLE DATA =====

// Curcumin (Turmeric Extract)
CREATE (curc:Ingredient {
    id: "ING-CURC-001",
    name: "Curcumin",
    botanical_name: "Curcuma longa",
    cas_number: "458-37-7",
    common_names: ["Turmeric Extract", "Curcumin Extract", "Curcuminoids"],
    category: "Herbal Extract",
    description: "Yellow-colored polyphenolic compound from turmeric rhizome",
    created_at: datetime()
})

// Synonyms
CREATE (s1:Synonym {text: "Turmeric Extract 95%", normalized: "turmeric extract", confidence: 0.98})
CREATE (s2:Synonym {text: "Curcumin 95", normalized: "curcumin", confidence: 1.0})
CREATE (s3:Synonym {text: "Curcuminoids", normalized: "curcuminoids", confidence: 0.95})
CREATE (s4:Synonym {text: "Turmeric Powder Extract", normalized: "turmeric powder extract", confidence: 0.90})

CREATE (curc)-[:HAS_SYNONYM {confidence: 0.98}]->(s1)
CREATE (curc)-[:HAS_SYNONYM {confidence: 1.0}]->(s2)
CREATE (curc)-[:HAS_SYNONYM {confidence: 0.95}]->(s3)
CREATE (curc)-[:HAS_SYNONYM {confidence: 0.90}]->(s4)

// Grades
CREATE (usp:Grade {
    name: "USP",
    full_name: "United States Pharmacopeia",
    standard_body: "USP",
    description: "Pharmaceutical grade",
    typical_assay_min: 95.0,
    typical_assay_max: 100.0
})

CREATE (food:Grade {
    name: "Food Grade",
    full_name: "Food Grade",
    standard_body: "FDA",
    description: "Suitable for food applications",
    typical_assay_min: 90.0,
    typical_assay_max: 95.0
})

CREATE (curc)-[:AVAILABLE_IN_GRADE]->(usp)
CREATE (curc)-[:AVAILABLE_IN_GRADE]->(food)

// Forms
CREATE (powder:Form {name: "Powder", description: "Fine powder"})
CREATE (extract:Form {name: "Extract", description: "Concentrated extract"})

CREATE (curc)-[:AVAILABLE_IN_FORM]->(powder)
CREATE (curc)-[:AVAILABLE_IN_FORM]->(extract)

// Assay Methods
CREATE (hplc:AssayMethod {
    id: "HPLC-001",
    name: "HPLC",
    technique: "High-Performance Liquid Chromatography",
    typical_range_min: 90.0,
    typical_range_max: 100.0,
    units: "percent"
})

CREATE (usp)-[:REQUIRES_ASSAY_METHOD]->(hplc)

// Certifications
CREATE (gmp:Certification {
    name: "GMP",
    full_name: "Good Manufacturing Practice",
    issuing_body: "FDA",
    region: "USA"
})

CREATE (organic:Certification {
    name: "Organic",
    full_name: "USDA Organic",
    issuing_body: "USDA",
    region: "USA"
})

CREATE (usp)-[:REQUIRES_CERTIFICATION]->(gmp)

// ===== MORE INGREDIENTS =====

// Ashwagandha
CREATE (ashwa:Ingredient {
    id: "ING-ASHW-001",
    name: "Ashwagandha Extract",
    botanical_name: "Withania somnifera",
    cas_number: "N/A",
    common_names: ["Ashwagandha", "Indian Ginseng", "Winter Cherry"],
    category: "Herbal Extract",
    description: "Adaptogenic herb from Ayurvedic medicine",
    created_at: datetime()
})

CREATE (ashwa_syn1:Synonym {text: "Ashwagandha Root Extract", normalized: "ashwagandha root extract", confidence: 0.98})
CREATE (ashwa_syn2:Synonym {text: "Withania somnifera Extract", normalized: "withania somnifera extract", confidence: 1.0})
CREATE (ashwa_syn3:Synonym {text: "KSM-66", normalized: "ksm 66", confidence: 0.90})

CREATE (ashwa)-[:HAS_SYNONYM]->(ashwa_syn1)
CREATE (ashwa)-[:HAS_SYNONYM]->(ashwa_syn2)
CREATE (ashwa)-[:HAS_SYNONYM]->(ashwa_syn3)
CREATE (ashwa)-[:AVAILABLE_IN_GRADE]->(usp)
CREATE (ashwa)-[:AVAILABLE_IN_FORM]->(powder)

// Vitamin C (Ascorbic Acid)
CREATE (vitc:Ingredient {
    id: "ING-VITC-001",
    name: "Ascorbic Acid",
    botanical_name: "N/A",
    cas_number: "50-81-7",
    common_names: ["Vitamin C", "L-Ascorbic Acid"],
    category: "Vitamin",
    description: "Water-soluble vitamin, antioxidant",
    created_at: datetime()
})

CREATE (vitc_syn1:Synonym {text: "Vitamin C", normalized: "vitamin c", confidence: 1.0})
CREATE (vitc_syn2:Synonym {text: "L-Ascorbic Acid", normalized: "l ascorbic acid", confidence: 1.0})
CREATE (vitc_syn3:Synonym {text: "Ascorbate", normalized: "ascorbate", confidence: 0.95})

CREATE (vitc)-[:HAS_SYNONYM]->(vitc_syn1)
CREATE (vitc)-[:HAS_SYNONYM]->(vitc_syn2)
CREATE (vitc)-[:HAS_SYNONYM]->(vitc_syn3)
CREATE (vitc)-[:AVAILABLE_IN_GRADE]->(usp)
CREATE (vitc)-[:AVAILABLE_IN_FORM]->(powder)

// Omega-3 (Fish Oil)
CREATE (omega3:Ingredient {
    id: "ING-OMG3-001",
    name: "Omega-3 Fatty Acids",
    botanical_name: "N/A",
    cas_number: "N/A",
    common_names: ["Fish Oil", "EPA/DHA", "Omega-3"],
    category: "Fatty Acid",
    description: "Essential fatty acids from marine sources",
    created_at: datetime()
})

CREATE (omega3_syn1:Synonym {text: "Fish Oil Omega-3", normalized: "fish oil omega 3", confidence: 0.98})
CREATE (omega3_syn2:Synonym {text: "EPA DHA", normalized: "epa dha", confidence: 0.95})
CREATE (omega3_syn3:Synonym {text: "Marine Oil", normalized: "marine oil", confidence: 0.90})

CREATE (omega3)-[:HAS_SYNONYM]->(omega3_syn1)
CREATE (omega3)-[:HAS_SYNONYM]->(omega3_syn2)
CREATE (omega3)-[:HAS_SYNONYM]->(omega3_syn3)
CREATE (omega3)-[:AVAILABLE_IN_GRADE]->(food)

CREATE (oilForm:Form {name: "Oil", description: "Liquid oil form"})
CREATE (omega3)-[:AVAILABLE_IN_FORM]->(oilForm)

// Protein Powder (Whey)
CREATE (whey:Ingredient {
    id: "ING-WHEY-001",
    name: "Whey Protein Isolate",
    botanical_name: "N/A",
    cas_number: "N/A",
    common_names: ["Whey Protein", "WPI", "Whey Isolate"],
    category: "Protein",
    description: "High-protein dairy derivative",
    created_at: datetime()
})

CREATE (whey_syn1:Synonym {text: "Whey Protein Isolate 90%", normalized: "whey protein isolate", confidence: 1.0})
CREATE (whey_syn2:Synonym {text: "WPI 90", normalized: "wpi 90", confidence: 0.98})

CREATE (whey)-[:HAS_SYNONYM]->(whey_syn1)
CREATE (whey)-[:HAS_SYNONYM]->(whey_syn2)
CREATE (whey)-[:AVAILABLE_IN_GRADE]->(food)
CREATE (whey)-[:AVAILABLE_IN_FORM]->(powder)

// ===== SUBSTITUTION RELATIONSHIPS =====

// Curcumin alternatives
CREATE (curc95:Ingredient {
    id: "ING-CURC-002",
    name: "Curcumin 95%",
    botanical_name: "Curcuma longa",
    category: "Herbal Extract"
})

CREATE (curc)-[:CAN_SUBSTITUTE {
    similarity: 1.0,
    conditions: "Exact same compound, different assay"
}]->(curc95)

// Ashwagandha alternatives
CREATE (ashwaRoot:Ingredient {
    id: "ING-ASHW-002",
    name: "Ashwagandha Root Powder",
    botanical_name: "Withania somnifera",
    category: "Herbal Powder"
})

CREATE (ashwa)-[:CAN_SUBSTITUTE {
    similarity: 0.75,
    conditions: "Extract vs whole root, lower potency"
}]->(ashwaRoot)

// ===== HIERARCHY =====
CREATE (polyphenol:Ingredient {id: "CAT-POLY-001", name: "Polyphenol", category: "Compound Class"})
CREATE (curc)-[:IS_A]->(polyphenol)

CREATE (adaptogen:Ingredient {id: "CAT-ADAP-001", name: "Adaptogen", category: "Functional Class"})
CREATE (ashwa)-[:IS_A]->(adaptogen)

// ===== QUERIES FOR MATCHING =====

// Example: Find ingredient by synonym
// MATCH (s:Synonym {normalized: "turmeric extract"})-[:REFERS_TO]->(i:Ingredient)
// RETURN i

// Example: Find suitable grades for ingredient
// MATCH (i:Ingredient {name: "Curcumin"})-[:AVAILABLE_IN_GRADE]->(g:Grade)
// RETURN g

// Example: Find substitutes
// MATCH (i:Ingredient {name: "Curcumin"})-[r:CAN_SUBSTITUTE]->(sub:Ingredient)
// WHERE r.similarity > 0.8
// RETURN sub, r.similarity, r.conditions

// Example: Fuzzy search with Levenshtein
// MATCH (s:Synonym)
// WHERE apoc.text.levenshteinDistance(s.normalized, "curcmin") < 3
// RETURN s.text, s.normalized
// ORDER BY apoc.text.levenshteinDistance(s.normalized, "curcmin")
// LIMIT 5
