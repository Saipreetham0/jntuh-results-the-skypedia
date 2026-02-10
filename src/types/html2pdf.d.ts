declare module 'html2pdf.js' {
    interface Html2PdfOptions {
        margin?: number | [number, number, number, number];
        filename?: string;
        image?: { type: string; quality: number };
        html2canvas?: any;
        jsPDF?: any;
    }

    interface Html2Pdf {
        from(element: HTMLElement | string): Html2Pdf;
        set(options: Html2PdfOptions): Html2Pdf;
        toPdf(): Html2Pdf;
        toCanvas(): Html2Pdf;
        toImg(): Html2Pdf;
        toType(type: string): Html2Pdf;
        save(): Promise<void>;
        output(type: string, options?: any): Promise<any>;
        then(callback: (value: any) => void): Html2Pdf;
        catch(callback: (reason: any) => void): Html2Pdf;
    }

    function html2pdf(): Html2Pdf;
    function html2pdf(element: HTMLElement | string, options?: Html2PdfOptions): Promise<void>;

    export default html2pdf;
}
