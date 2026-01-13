from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import (
    SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, 
    PageBreak, Image
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_CENTER, TA_LEFT
import io
import numpy as np
import matplotlib.pyplot as plt
import matplotlib
from typing import Dict, List

# Ensure server-side rendering without a GUI
matplotlib.use('Agg')

class MVPBlueprintGenerator:
    def __init__(self):
        self.styles = getSampleStyleSheet()
        self._setup_custom_styles()
    
    def _setup_custom_styles(self):
        """Standardizes typography for the blueprint."""
        self.styles.add(ParagraphStyle(
            name='CustomTitle', parent=self.styles['Heading1'],
            fontSize=28, textColor=colors.HexColor('#6B46C1'),
            spaceAfter=30, alignment=TA_CENTER, fontName='Helvetica-Bold'
        ))
        self.styles.add(ParagraphStyle(
            name='SectionHeader', parent=self.styles['Heading2'],
            fontSize=18, textColor=colors.HexColor('#2D3748'),
            spaceBefore=20, spaceAfter=12, fontName='Helvetica-Bold',
            borderWidth=1, borderColor=colors.HexColor('#6B46C1'),
            borderPadding=10, backColor=colors.HexColor('#F7FAFC')
        ))
        self.styles.add(ParagraphStyle(
            name='Badge', parent=self.styles['Normal'],
            fontSize=10, textColor=colors.white, backColor=colors.HexColor('#4A5568'),
            borderPadding=4, borderRadius=4, alignment=TA_CENTER
        ))

    def _create_radar_chart(self, data: List[Dict]) -> io.BytesIO:
        """Renders the Feature Matrix Polygon."""
        categories = [item.get('feature', 'Feature') for item in data]
        coverage = [item.get('market', 0) for item in data]
        opportunity = [item.get('opportunity', 0) for item in data]
        
        N = len(categories)
        angles = [n / float(N) * 2 * np.pi for n in range(N)]
        angles += angles[:1]
        coverage += coverage[:1]
        opportunity += opportunity[:1]
        
        fig, ax = plt.subplots(figsize=(6, 6), subplot_kw=dict(polar=True))
        fig.patch.set_facecolor('#F8FAFC')
        plt.xticks(angles[:-1], categories, color='#475569', size=10, fontweight='bold')
        ax.set_rlabel_position(0)
        plt.yticks([25, 50, 75, 100], ["25", "50", "75", "100"], color="#94A3B8", size=8)
        plt.ylim(0, 100)
        
        ax.plot(angles, coverage, linewidth=2, color='#EF4444', label='Market Coverage')
        ax.fill(angles, coverage, '#EF4444', alpha=0.25)
        ax.plot(angles, opportunity, linewidth=2, color='#10B981', label='Opportunity')
        ax.fill(angles, opportunity, '#10B981', alpha=0.3)
        
        plt.legend(loc='upper right', bbox_to_anchor=(1.3, 1.1))
        img_buffer = io.BytesIO()
        plt.savefig(img_buffer, format='png', dpi=150, bbox_inches='tight')
        plt.close()
        img_buffer.seek(0)
        return img_buffer

    def _create_sentiment_chart(self, data: List[Dict]) -> io.BytesIO:
        """Renders the Sentiment Bar Chart."""
        labels = [d['complaint'] for d in data]
        counts = [d['count'] for d in data]
        
        fig, ax = plt.subplots(figsize=(6, 4))
        fig.patch.set_facecolor('#F8FAFC')
        ax.barh(labels, counts, color='#F43F5E', alpha=0.8)
        ax.set_xlabel('Complaint Frequency')
        ax.invert_yaxis()
        plt.tight_layout()
        
        img_buffer = io.BytesIO()
        plt.savefig(img_buffer, format='png', dpi=150)
        plt.close()
        img_buffer.seek(0)
        return img_buffer

    def _create_growth_chart(self, data: List[Dict]) -> io.BytesIO:
        """Renders Dual-Axis Growth Forecast."""
        months = [d['month'] for d in data]
        downloads = [d['downloads'] for d in data]
        revenue = [d['revenue'] for d in data]

        fig, ax1 = plt.subplots(figsize=(8, 4))
        fig.patch.set_facecolor('#F8FAFC')
        ax1.set_ylabel('Downloads', color='#8B5CF6', fontweight='bold')
        ax1.plot(months, downloads, color='#8B5CF6', linewidth=3, marker='o')
        ax1.fill_between(months, downloads, color='#8B5CF6', alpha=0.1)
        
        ax2 = ax1.twinx()
        ax2.set_ylabel('Revenue ($)', color='#3B82F6', fontweight='bold')
        ax2.plot(months, revenue, color='#3B82F6', linewidth=3, marker='s')
        
        fig.tight_layout()
        img_buffer = io.BytesIO()
        plt.savefig(img_buffer, format='png', dpi=150)
        plt.close()
        img_buffer.seek(0)
        return img_buffer

    def generate_report(self, data: Dict, output_path: str):
        """Builds a complete multi-page PDF blueprint mirroring the dashboard."""
        doc = SimpleDocTemplate(output_path, pagesize=letter)
        story = []
        
        # 1. HEADER & METRIC CARDS
        story.append(Spacer(1, 0.5*inch))
        story.append(Paragraph(f"MVP Blueprint: {data['genre']}", self.styles['CustomTitle']))
        
        m = data['metrics']
        metrics_table = Table([
            [Paragraph("<b>Opportunity Score</b>", self.styles['Normal']), Paragraph("<b>Saturation</b>", self.styles['Normal']), Paragraph("<b>Competing Apps</b>", self.styles['Normal'])],
            [f"{m['opportunity_score']}/100", f"{m['saturation_score']}%", f"{m['top_apps_count']} apps"]
        ], colWidths=[2*inch, 2*inch, 2*inch])
        metrics_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#F1F5F9')),
            ('ALIGN', (0,0), (-1,-1), 'CENTER'),
            ('GRID', (0,0), (-1,-1), 0.5, colors.grey),
            ('PADDING', (0,0), (-1,-1), 10)
        ]))
        story.append(metrics_table)
        story.append(Spacer(1, 0.4*inch))

        # 2. ANALYSIS CHARTS
        story.append(Paragraph("Market Gap & Sentiment Analysis", self.styles['SectionHeader']))
        radar_img = self._create_radar_chart(data['opportunity_matrix'])
        story.append(Image(radar_img, width=4*inch, height=4*inch))
        
        sentiment_img = self._create_sentiment_chart(data['sentiment_chart_data'])
        story.append(Image(sentiment_img, width=4*inch, height=2.5*inch))
        story.append(PageBreak())

        # 3. GROWTH & ROADMAP
        story.append(Paragraph("Growth Forecast & Strategy", self.styles['SectionHeader']))
        growth_img = self._create_growth_chart(data['growth_trend'])
        story.append(Image(growth_img, width=6*inch, height=3*inch))
        
        story.append(Paragraph("Strategic Roadmap", self.styles['Heading3']))
        for rec in data.get('recommendations', []):
            story.append(Paragraph(f"• <b>{rec['title']}</b> ({rec['priority']})", self.styles['Normal']))
            story.append(Paragraph(f"<i>{rec['reasoning']}</i>", self.styles['Italic']))
            story.append(Spacer(1, 0.1*inch))
        
        story.append(PageBreak())

        # 4. TECH STACK & ASO
        story.append(Paragraph("Implementation & Keywords", self.styles['SectionHeader']))
        
        stack_data = [["Category", "Recommended", "Reasoning"]]
        for item in data.get('tech_stack', []):
            stack_data.append([item['category'], item['recommended'], item['reasoning']])
        
        stack_table = Table(stack_data, colWidths=[1.5*inch, 1.5*inch, 3.5*inch])
        stack_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#6B46C1')),
            ('TEXTCOLOR', (0,0), (-1,0), colors.white),
            ('GRID', (0,0), (-1,-1), 0.5, colors.grey),
            ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold')
        ]))
        story.append(stack_table)
        
        story.append(Spacer(1, 0.4*inch))
        story.append(Paragraph("ASO Keywords", self.styles['Heading3']))
        story.append(Paragraph(", ".join(data.get('aso_keywords', [])), self.styles['Normal']))

        doc.build(story)